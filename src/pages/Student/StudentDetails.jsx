import React from 'react'
import { useParams } from "react-router-dom";

export default function StudentDetails() {
  let { studentId } = useParams();
  return (
    <div>
      Gelen studentId: {studentId}
    </div>
  )
}
