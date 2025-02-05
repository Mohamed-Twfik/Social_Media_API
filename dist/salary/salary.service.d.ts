import { AttendanceService } from "src/attendance/attendance.service";
import { ProductionService } from "src/production/production.service";
import { GetSalaryDto } from './dto/get-salary.dto';
import { UserDocument } from "src/users/entities/user.entity";
import { BonusService } from '../bonus/bonus.service';
import { DepartmentsService } from "src/departments/departments.service";
export declare class SalaryService {
    private readonly productionService;
    private readonly attendanceService;
    private readonly bonusService;
    private readonly departmentsService;
    constructor(productionService: ProductionService, attendanceService: AttendanceService, bonusService: BonusService, departmentsService: DepartmentsService);
    getSalary(getSalaryDto: GetSalaryDto, user: UserDocument): Promise<{
        productionWorkers: any[];
        productionSum: {
            totalPrice: number;
            totalSalary: number;
            bonus: number;
        };
        attendanceWorkers: any[];
        attendanceSum: any;
        fromDate: string;
        toDate: string;
        salaryForm: {
            from: string;
            to: string;
        };
        arabicFromDate: string;
        arabicToDate: string;
        user: UserDocument;
        type: string;
        title: string;
    }>;
}
