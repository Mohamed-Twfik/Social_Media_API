import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';
import { BaseRenderVariablesType } from 'src/users/types/base-render-variables.type';
import { UsersService } from 'src/users/users.service';
import { BaseService } from 'src/utils/classes/base.service';
import { QueryDto } from 'src/utils/dtos/query.dto';
import { WorkerType } from 'src/workers/enums/workerType.enum';
import { WorkersService } from 'src/workers/workers.service';
import { AttendanceDto } from './dto/attendance.dto';
import { Attendance, AttendanceDocument } from './entities/attendance.entity';

@Injectable()
export class AttendanceService extends BaseService {
  searchableKeys: string[] = [
    "arabicDate",
    "createdAtArabic",
    "updatedAtArabic",
  ];

  constructor(
    @InjectModel(Attendance.name) private attendanceModel: Model<Attendance>,
    private readonly usersService: UsersService,
    private readonly workersService: WorkersService,
  ) {
    super();
  }

  getModuleModel(): Model<any> {
    return this.attendanceModel;
  }

  async getAdditionalRenderVariables(): Promise<object> {
    return {
      users: await this.usersService.find(),
      workers: await this.workersService.find(),
      type: 'attendance',
      title: 'الحضور'
    };
  }

  /**
   * Create attendance.
   * @param createDto Attendance data.
   * @param userDocument The user who is create attendance.
   */
  async create(createDto: AttendanceDto, userDocument: UserDocument): Promise<void> {
    const existAttendance = await this.attendanceModel.findOne({ worker: createDto.worker, date: createDto.date });
    if (existAttendance) throw new ConflictException('تم إضافة حضور العامل مسبقا.');
    
    const inputData: Attendance = {
      ...createDto,
      createdBy: userDocument._id,
      updatedBy: userDocument._id
    };
    await this.attendanceModel.create(inputData);
  }

  /**
   * Find all attendance.
   * @param queryParams The query parameters.
   * @param user The user who is get attendance.
   * @returns The render variables.
   */
  async findAll(queryParams: QueryDto, user: UserDocument) {
    const queryBuilder = this.getQueryBuilder(queryParams);
    const data = await queryBuilder
      .filter()
      .search(this.searchableKeys)
      .sort()
      .paginate()
      .build()
      .populate('worker', 'name')
      .populate('createdBy', 'username')
      .populate('updatedBy', 'username');

    const renderVariables: BaseRenderVariablesType = {
      error: queryParams.error || null,
      data,
      user,
      filters: {
        search: queryBuilder.getSearchKey(),
        sort: queryBuilder.getSortKey(),
        pagination: {
          page: queryBuilder.getPage(),
          totalPages: await queryBuilder.getTotalPages(),
          pageSize: queryBuilder.getPageSize()
        },
        ...queryBuilder.getCustomFilters()
      }
    };
    return {...renderVariables, ...(await this.getAdditionalRenderVariables())};
  }

  /**
   * Update attendance.
   * @param entity Attendance document that will be updated.
   * @param updateDto Attendance update data.
   * @param userDocument The user who is update attendance.
   */
  async update(entity: AttendanceDocument, updateDto: AttendanceDto, userDocument: UserDocument): Promise<void> {
    const existAttendance = await this.attendanceModel.findOne({ worker: updateDto.worker, date: updateDto.date, _id: { $ne: entity._id } });
    if (existAttendance) throw new ConflictException('تم إضافة حضور العامل مسبقا.');

    const inputData: Partial<Attendance> = {
      ...updateDto,
      updatedBy: userDocument._id
    };
    await entity.set(inputData).save();
  }

  getSalaryData(startDate: Date, endDate: Date) {
    return this.attendanceModel.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $lookup: {
          from: 'workers',
          localField: '_id',
          foreignField: '_id',
          as: 'workerDetails',
        },
      },
      {
        $unwind: '$workerDetails',
      },
      {
        $match: {
          'workerDetails.type': { $ne: WorkerType.Production },
        },
      },
      {
        $group: {
          _id: '$worker',
          totalPrice: { $sum: { $ifNull: ['$price', 0] } },
          name: { $first: '$workerDetails.name' },
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          totalPrice: 1,
        },
      },
    ]);
  }
}