export class CareerApi {
  static fetchAllCareers() {
    return fetch('http://localhost:8080/career')
  }
}
