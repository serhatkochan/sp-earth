import ApiService from './apiService';

class StudentService {
  get() {
    return ApiService.get('api/students');
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
}

export default new StudentService();
