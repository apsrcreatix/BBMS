export default class Data {
  static GENDER = ["Male", "Female"];
  static BLOOD_GROUP = ["A1", "A1B", "A2", "A2B", "O", "Unknown"];
  static RH_TYPE = ["Positive", "Negative"];
  static AGE_GROUP = [[18, 30], [31, 40], [41, 50], [51, 60]];
  static DONOR_TYPE = ["WB", "APH"];
  static D_DETAILS_BLANK = {
    regDate: "",
    regCenter: "",
    motivatedBy: "",
    name: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    rhType: "",
    fatherSpouseName: "",
    education: "",
    occupation: "",
    wb_check: false,
    wbDonor_lastDonation: "",
    wbDonor_nextDonation: "",
    platlet_check: false,
    platletDonor_lastDonation: "",
    platletDonor_nextDonation: "",
    plasma_check: false,
    plasmaDonor_lastDonation: "",
    plasmaDonor_nextDonation: "",
    drc_check: false,
    drcDonor_lastDonation: "",
    drcDonor_nextDonation: "",
    lastDonated_type: "",
    lastDonated_lastDonation: "",
    lastDonated_nextDonation: "",
    r_address: "",
    r_pincode: "",
    r_door: "",
    r_buildingName: "",
    r_city: "",
    r_postOffice: "",
    r_area: "",
    r_taluk: "",
    r_district: "",
    r_mobile: "",
    r_email: "",
    r_phone: "",
    o_address: "",
    o_pincode: "",
    o_door: "",
    o_buildingName: "",
    o_city: "",
    o_postOffice: "",
    o_area: "",
    o_taluk: "",
    o_district: "",
    o_phone: "",
    o_email: "",
    o_mobile: ""
  };

  static TEMP_REG_CENTRE = [
    "Haemcare - Nungambakkam",
    "Rotatory Blood Bank - Nunganallur"
  ];

  static SERUMS = [
    "A_CELLS",
    "ANTI_A",
    "ANTI_A1_LECTIN",
    "ANTI_AB",
    "ANTI_B",
    "ANTI_BOVINE_ALBUMIN",
    "ANTI_D",
    "ANTI_H_LECTIN",
    "B_CELLS",
    "C_CELLS",
    "COOMBS",
    "O_CELLS"
  ];
  
  static CHEMICALS = [
    "COPPER_SULPHATE",
    "DISTILLED_WATER",
    "LEISHMAN_STAIN",
    "NORMAL_SALINE"
  ];

  static BLOOD_BAG = [
    "DOUBLE_BLOOD_BAG",
    "PENTAL_BLOOD_BAG",
    "QUADRUPLE_BLOOD_BAG",
    "SINGLE_BLOOD_BAG",
    "TRANSFER_BLOOD_BAG",
    "TRIPLE_BLOOD_BAG"
  ];

  static KITS = [
    "HBSAG_RAPID_KIT",
    "HCV_ELISA_KIT",
    "HCV_RAPID_KIT",
    "HIV_1_2_RAPID_KIT",
    "HIV_ELISA_KIT",
    "HSS_AG_ELISA_KIT",
    "VDRL_RAPID_KIT"
  ];

  static STATUS = [
    "USED",
    "REJECTED"
  ];

  static USE = [
    "DONOR",
    "PATIENT"
  ];
  
  static INPUT_BLOOD = [
    "WHOLE_BLOOD_IP",
    "PLATLET_CONCENTRATE_USP",
    "FROZEN_PLASMA",
    "CONC_RBC_IP"
  ];

  static INPUT_STOCK = [
    "CONC_RBC",
    "WHOLE_BLOOD",
    "PLATLET_CONC",
    "FROZEN_PLASMA",
    "CRYO_PRECIPITATE"
  ];

  static REPORT = [
    "PASS",
    "FAIL"
  ];

  static DONOR_ID = [
    300,
    301
  ];

}
