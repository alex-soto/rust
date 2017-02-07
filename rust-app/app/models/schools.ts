export interface School {
  "_id": string,
  "code": string,
  "description": string,
  "level": string,
  "numSubjects": number,
  "subjects": any[],
  "selected": boolean
}