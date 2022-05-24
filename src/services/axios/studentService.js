import ApiService from './apiService';

class StudentService {
  getAllStudents() {
    return ApiService.get('api/students');
  }
  findByFilters(filters) {
    return ApiService.post('api/students/findByFilters', { ...filters });
  }
  exportToExcel(filters) {
    return ApiService.post(
      'api/students/exportToExcel',
      { ...filters },
      {
        responseType: 'blob',
      }
    );
  }
  exportToPdf(filters) {
    return ApiService.post(
      'api/students/exportToPdf',
      { ...filters },
      {
        responseType: 'blob',
      }
    );
  }
  findByStudentId(studentId) {
    return ApiService.get('api/students/findByStudenId?studentId=' + studentId);
  }
  addStudent(body) {
    return ApiService.post('api/students/addStudent', { ...body });
  }
  deleteStudent(studentId) {
    return ApiService.delete(
      'api/students/deleteStudent?studentId=' + studentId
    );
  }
  updateStudent(studentId, body) {
    return ApiService.put('api/students/updateStudent?studentId=' + studentId, {
      ...body,
    });
  }
  currentStudent() {
    return ApiService.get('api/students/currentStudent');
  }
}

export default new StudentService();
