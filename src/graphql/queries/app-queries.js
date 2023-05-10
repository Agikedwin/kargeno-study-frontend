

const FETCH_ACCES_LEVELS_QUERY = `
query  {
  getLevels {
     date_created
     date_updated
     _id
     level_name
     description
     level_id
  }
}
`;

const FETCH_DESIGNATIONS =`
 query{
  getAllDesignations {
    designation_name
    level_id
    _id
    description
    date_created
    date_updated
    designation_id
    userlevels {
      level_name
      description
      date_created
      _id
      level_id

    }
  }
}
`

const FETCH_USERS =`
query ($paramId: String ){
getUsers(paramId: $paramId) {
  _id
    surname
    other_names
    designation_id
    level_id
    dob
    email
    phone_number
    patient_identifier
    gender
    username
    password
    status
    editor
    date_created
    date_updated
    token
    designation {
      level_obId
      level_id  
      designation_name
      designation_id
      description
      date_updated
      date_created
      _id
    }
    level {
      _id
      date_created
      date_updated
      description 
      level_id
      level_name
    }
  }
}
`


const FETCH_PROGRAM = `
query {
  getPrograams {
    date_created
    date_updated
    programName
    description
    owner
    status
    id
  }
}

`
const FETCH_PROGRAM_ENROLL = `
query ($paramId: String){
  getUserPrograam {
   program_id
   createdAt
   id
   status
   userId
  }
}
`

const FETCH_VISITS = `
query {
  getVisits {
    id
    visitName
     visitNumber
     program_id
     date_created
     date_updated
     windowPeriod
     dayFromBaseDate
     status
     description
  }
}
`

const FETCH_VISITS_SERVICES = `

query {
  getVisitServices {
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
const FETCH_PROGRAMS = `
query GetPrograams {
  getPrograams {
    id
    programName
    status
  }
}
`

const FETCH_LAST_SERVICE_PROVIDED = `
query ($paramId: searParams) {
  getLastServiceProvided(paramId: $paramId) 
  {
    serviceOfferedId
    status
    visitDate
    visitId
    visitType
    userId

  }
}
`

const FETCH_ALL_VISIT_TYPES = `
query ($paramId: String) {
  getAllVisitTypes(paramId: $paramId){    
    visitName
    visitNumber
    dayFromBaseDate
    _id
    description
    date_updated
    date_created
    phoneCalls {
      _id
      visitStatus
      userId
      visitId
      date_created
      date_updated
      visit_date
    }
    physicalVisits {
   
      _id
      visitStatus
      userId
      visitId
      date_created
      date_updated
      visit_date
    }
  }
}
`



export {

  FETCH_ACCES_LEVELS_QUERY, 
  FETCH_DESIGNATIONS,
  FETCH_USERS,
  FETCH_PROGRAM,
  FETCH_PROGRAM_ENROLL,
  FETCH_VISITS,
  FETCH_VISITS_SERVICES,
  FETCH_PROGRAMS,
  FETCH_LAST_SERVICE_PROVIDED,
  FETCH_ALL_VISIT_TYPES

}