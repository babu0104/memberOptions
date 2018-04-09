import { Injectable } from '@angular/core';
@Injectable()
export class AppGlobal {
    public DEFAULT_IDLE_TIME: any = 150;
    public readonly DEFUALT_MSO: any = "0";
    public Alerts: any = {
        ssnalerts: [
            { name: '01 SSN Deceased', code: '01', value: 'value1' },
            { name: '02 SSN Invalid Combination of Digits', code: '02', value: 'value2' },
            { name: '03 SSN Has Not Been Asigned', code: '03', value: 'value3' },
            { name: '04 SSN May Have Been Improperly Released', code: '04', value: 'value4' }
        ],
        ssninvalids: [
            { name: '01 SSN Not Numeric', code: '01', value: 'value5' },
            { name: '02 SSN Invalid Combination of Digits', code: '02', value: 'value6' },
            { name: '03 SSN Has Not Been Asigned', code: '03', value: 'value7' }
        ],
        addressalerts: [
            { name: '01 Rental Box/Mail Receiving Service/Mail Drop', code: '01', value: '01' },
            { name: '02 Address Not Assigned', code: '02', value: '02' },
            { name: '03 Answering Service', code: '03', value: '03' },
            { name: '04 Prison/Penal Institution', code: '04', value: '04' },
            { name: '05 Hospital', code: '05', value: '02' },
            { name: '06 Nursing/Primary Care Facility', code: '06', value: '03' },
            { name: '07 Drug/Alcohol Treatment Center', code: '07', value: '04' },
            { name: '08 Zip Code/Area Code Mismatch', code: '08', value: '02' },
            { name: '09 Health Agency', code: '09', value: '03' },
            { name: '10 Hotel/Motel/Vacation Resort', code: '10', value: '04' },
            { name: '11 Vacant Lot', code: '11', value: '02' },
            { name: '12 Seasonal', code: '12', value: '03' }
        ],
        addressinvalids: [
            { name: '01 Street Name Invalid for City/ZIP', code: '01', value: '02' },
            { name: '02 Blank Address Line', code: '02', value: '03' },
            { name: '03 Street Name Not in Database', code: '03', value: '04' },
            { name: '04 No Range', code: '04', value: '02' },
            { name: '05 Street Type and/or Direction Missing or Incorrect', code: '05', value: '03' },
            { name: '06 Range Invalid', code: '06', value: '04' },
            { name: '07 Direction Incorrect', code: '07', value: '02' },
            { name: '08 Street Type Incorrect', code: '08', value: '03' },
            { name: '09 Range and Direction Incorrect', code: '09', value: '04' },
            { name: '10 Range and Street Type Incorrect', code: '10', value: '02' },
            { name: '11 Direction and Street Type Incorrect', code: '11', value: '03' },
            { name: '12 Range, Direction and Street Type Incorrect', code: '12', value: '04' },
            { name: '13 Unable to Identify Address', code: '13', value: '03' },
            { name: '14 Apartment Number Missing', code: '14', value: '04' },
            { name: '15 City and/or State and/or ZIP Missing or Incorrect', code: '15', value: '03' }
        ],
        phoneAlerts: [
            { name: '01 Rental Box/Directory Assistance #/ Toll-free #', code: '01', value: 'phone1' },
            { name: '02 Pager #', code: '02', value: 'phone2' },
            { name: '03 Answering Service', code: '03', value: 'phone3' },
            { name: '04 Prison/Penal Institution', code: '04', value: 'phone4' },
            { name: '05 Hospital', code: '05', value: 'phone5' },
            { name: '06 Nursing/Primary Care Facility', code: '06', value: 'phone6' },
            { name: '07 Drug/Alcohol Treatment Center', code: '07', value: 'phone7' },
            { name: '08 ZIP Code/Area Code Mismatch', code: '08', value: 'phone8' },
            { name: '09 Health Agency', code: '09', value: 'phone9' },
            { name: '10 Hotel/Motel/Vacation Resort', code: '10', value: 'phone10' },
            { name: '11 Invalid Area Code', code: '11', value: 'phone11' },
            { name: '12 Area Code Does Not Match Prefix', code: '12', value: 'phone12' },
            { name: '13 Cellular Phone', code: '13', value: 'phone13' }
        ],
        phoneInvalids: [
            { name: '01 Not Numeric', code: '01', value: 'phone14' },
            { name: '02 Numeric Incomplete', code: '02', value: 'phone15' },
            { name: '03 Invalid Area Code', code: '03', value: 'phone16' },
            { name: '04 Area Code Does Not Match Preifx', code: '04', value: 'phone17' }
        ],
    }
    public PCSThreshold: any = {
        limittedLabel: "Limitted",
        extendedLabel: "Expanded",
        FraudTypes: {
            APtitle: "Combined Approved and Declained Enrollments- AP",
            RRtitle: "RR",
            PRtitle: "PR",
            PF00title: "PF-00",
            PF01title: "PF-01",
            PF02title: "PF-02",
            PF03title: "PF-03",
            PF04title: "PF-04",
            PF05title: "PF-05",
            PF06title: "PF-06",
            PF07title: "PF-07",
            PF08title: "PF-08",
            PF09title: "PF-09",
            PF10title: "PF-10",
            PF11title: "PF-11",
            PF12title: "PF-12",
            PF13title: "PF-13",
            PF14title: "PF-14"
        },
        AP_UuDecodes: ['APSSN', 'APSTA', 'APADR', 'APPHN', 'APDVC', 'APIPA', 'APEML', 'APFUN'],
        PR_UuDecodes: ['LRSSN', 'LRSTA', 'LRADR', 'LRPHN', 'LRDVC', 'LRIPA', 'LREML', 'LRFUN'],
        RR_UuDecodes: ['RRSSN', 'RRSTA', 'RRADR', 'RRPHN', 'RRDVC', 'RRIPA', 'RREML', 'RRFUN'],
        pf0_UuDecodes: ['UUS00', 'UUT00', 'UUA00', 'UUP00', 'UUD00', 'UUI00', 'UUE00', 'UUF00'],
        pf1_UuDecodes: ['UUS01', 'UUT01', 'UUA01', 'UUP01', 'UUD01', 'UUI01', 'UUE01', 'UUF01'],    // ["UUS01", "UUP01", "UUA01"];
        pf2_UuDecodes: ['UUS02', 'UUT02', 'UUA02', 'UUP02', 'UUD02', 'UUI02', 'UUE02', 'UUF02'],
        pf3_UuDecodes: ['UUS03', 'UUT03', 'UUA03', 'UUP03', 'UUD03', 'UUI03', 'UUE03', 'UUF03'],
        pf4_UuDecodes: ['UUS04', 'UUT04', 'UUA04', 'UUP04', 'UUD04', 'UUI04', 'UUE04', 'UUF04'],
        pf5_UuDecodes: ['UUS05', 'UUT05', 'UUA05', 'UUP05', 'UUD05', 'UUI05', 'UUE05', 'UUF05'],
        pf6_UuDecodes: ['UUS06', 'UUT06', 'UUA06', 'UUP06', 'UUD06', 'UUI06', 'UUE06', 'UUF06'],
        pf7_UuDecodes: ['UUS07', 'UUT07', 'UUA07', 'UUP07', 'UUD07', 'UUI07', 'UUE07', 'UUF07'],
        pf8_UuDecodes: ['UUS08', 'UUT08', 'UUA08', 'UUP08', 'UUD08', 'UUI08', 'UUE08', 'UUF08'],
        pf9_UuDecodes: ['UUS09', 'UUT09', 'UUA09', 'UUP09', 'UUD09', 'UUI09', 'UUE09', 'UUF09'],
        pf10_UuDecodes: ['UUS10', 'UUT10', 'UUA10', 'UUP10', 'UUD10', 'UUI10', 'UUE10', 'UUF10'],
        pf11_UuDecodes: ['UUS11', 'UUT11', 'UUA11', 'UUP11', 'UUD11', 'UUI11', 'UUE11', 'UUF11'],
        pf12_UuDecodes: ['UUS12', 'UUT12', 'UUA12', 'UUP12', 'UUD12', 'UUI12', 'UUE12', 'UUF12'],
        pf13_UuDecodes: ['UUS13', 'UUT13', 'UUA13', 'UUP13', 'UUD13', 'UUI13', 'UUE13', 'UUF13'],
        pf14_UuDecodes: ['UUS14', 'UUT14', 'UUA14', 'UUP14', 'UUD14', 'UUI14', 'UUE14', 'UUF14'],

    }
}