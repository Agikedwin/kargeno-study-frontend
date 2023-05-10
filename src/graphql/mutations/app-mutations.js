//import gql from 'graphql-tag';

const CREATE_ACCESS_LEVEL = `
mutation createLevel($level_name: String!, $description: String){
    createLevel(levelIput:{level_name:$level_name,description:$description}
          ){ 
            _id
            level_name
            description
            date_created
            date_updated
     }
     }
`

const CREATE_DESIGNATIONS = `
mutation  createDesignations($designation_name: String, $description: String, $level_id: Int!, $level_obId: String) {
  createDesignations (data: {
    designation_name: $designation_name
    description: $description
    level_id: $level_id
    level_obId: $level_obId
  }){
    designation_name
    level_id
    description
    _id
  }
}

`

const CREATE_USER = `

mutation  createUser($surname: String!, $other_names: String, $patient_identifier:String!, $phone_number: String,  $level_id: Int! , $designation_id: Int!, $dob: String, $email: String,
  $gender: String) {
  createUser (data: {
    surname: $surname
    other_names: $other_names
    phone_number: $phone_number
    designation_id: $designation_id
    level_id: $level_id
    patient_identifier: $patient_identifier
    dob: $dob
    email: $email
    gender: $gender
  }){
    surname
    designation_id
    patient_identifier
    
  }
}
`

const CREATE_PROGRAM = `
mutation postPogram($programName: String!, $owner: String, $description: String){
  postPogram(data:{
    programName: $programName
    owner:  $owner
    description: $description
  }) {
    programName
    id    
    date_created
    date_updated
  }
}

`
const CREATE_PROGRAM_ENROLL = `
mutation postUserPogram($programId: String!, $userId: String){
  postUserPogram(data: {
    programId: $programId
    userId: $userId
  }) {
    
    userId
    programId
    date_created
    date_updated
  }
}

`
const CREATE_VISITS = `
mutation postVisits($visitName: String!, $program_id: String!, $visitNumber:  String, $description: String,
   $windowPeriod: String, $dayFromBaseDate: String){
  postVisits(data: {
    visitName: $visitName
    visitNumber: $visitNumber
    description:  $description
    program_id: $program_id
    windowPeriod: $windowPeriod
    dayFromBaseDate: $dayFromBaseDate
  }) {
    id
    visitName
    program_id
     visitNumber
     date_created
    date_updated
    dayFromBaseDate
  }
}

`
const CREATE_VISITS_SERVICES = `

mutation postVisitServices($serviceName: String!, $visitId: String, $duration: String, $description: String){
  postVisitServices(data: {
    serviceName: $serviceName
    description: $description
    duration: $duration
    visitId: $visitId
  }) {
    serviceName
    id
    visitId
    date_created
    date_updated
    status
    visitId
    description
    duration
  }
}
`
//physocal visits
const CREATE_PHYSICAL_SERVICES = `

mutation postPhysicalServices(
    $userId: ID!,
    $visitId:  ID!,
    $visitType: Int,
    $visitDate: String,
    $serviceOfferedId: ID!,
    $physicalVisitId: ID!,
    $visitNumber: String,
  
  ){
    postPhysicalServices(data: {
    userId:  $userId
    visitId:  $visitId
    visitType:  $visitType
    visitDate:  $visitDate
    serviceOfferedId:  $serviceOfferedId
    physicalVisitId: $physicalVisitId
    visitNumber: $visitNumber
    
  }) {
    id
    visitType
  }
}
`
//phone call services

const CREATE_CALL_SERVICES_OFFERED = `

mutation postPhoneServices(
    $userId: ID!,
    $visitId:  ID!,
    $visitType: Int,
    $visitDate: String,
    $serviceOfferedId: ID!,
    $callVisitId: ID!,
  
  ){
    postPhoneServices(data: {
    userId:  $userId
    visitId:  $visitId
    visitType:  $visitType
    visitDate:  $visitDate
    serviceOfferedId:  $serviceOfferedId,
    callVisitId: $callVisitId
    
  }) {
    id
    visitType
  }
}
`
const CREATE_USER_PROGRAMS = `
mutation postUserPogram ($programId: ID!, $userId: ID!,$enrollment_date: String $enrollStatus: Boolean){
  postUserPogram (data: {
    programId: $programId,
    userId: $userId,
    enrollment_date: $enrollment_date,
    enrollStatus: $enrollStatus
  }){
    id
    programId
    userId
    enrollStatus
    enrollment_date
  }
}

`

export {
  CREATE_ACCESS_LEVEL,
  CREATE_DESIGNATIONS,
  CREATE_USER,
  CREATE_PROGRAM,
  CREATE_PROGRAM_ENROLL,
  CREATE_VISITS,
  CREATE_VISITS_SERVICES,
  CREATE_PHYSICAL_SERVICES,
  CREATE_USER_PROGRAMS,
  CREATE_CALL_SERVICES_OFFERED
}