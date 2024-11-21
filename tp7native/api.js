import axios from "axios";

const API_URL = "http://10.0.2.2:8084"; // Replace with your backend URL
//class

export const getAllClasses = async () => {
  try {
    const response = await axios.get(`${API_URL}/class/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};

export const deleteClass = async (id) => {
  try {
    await axios.delete(`${API_URL}/class/delete`, { params: { id } });
  } catch (error) {
    console.error("Error deleting class:", error);
    throw error;
  }
};

export const updateClass = async (classe) => {
  try {
    const response = await axios.put(`${API_URL}/class/update`, classe);
    return response.data;
  } catch (error) {
    console.error("Error updating class:", error);
    throw error;
  }
};

export const getStudentsByClass = async (classId) => {
    try {
      const response = await axios.get(`${API_URL}/etudiant/byClass`, { params: { classId } });
      return response.data;
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  };
  

// Add more API functions as needed

export const getAllFormations = async () => {
  try {
    const response = await axios.get(`${API_URL}/formation/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching formations:', error);
    throw error;
  }
};

export const deleteFormation = async (id) => {
  try {
    await axios.delete(`${API_URL}/formation/delete`, { params: { id } });
  } catch (error) {
    console.error('Error deleting formation:', error);
    throw error;
  }
};

export const updateFormation = async (formation) => {
  try {
    const response = await axios.put(`${API_URL}/formation/update`, formation);
    return response.data;
  } catch (error) {
    console.error('Error updating formation:', error);
    throw error;
  }
};

export const getStudentsByFormation = async (formationId) => {
    try {
      const response = await axios.get(`${API_URL}/etudiant/byFormation`, { params: { formationId } });
      return response.data;
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  };


  export const addClass = async (classe) => {
    try {
      const response = await axios.post(`${API_URL}/class/add`, classe);
      return response.data;
    } catch (error) {
      console.error('Error adding class:', error);
      throw error;
    }
  };

  export const addFormation = async (formation) => {
    try {
      const response = await axios.post(`${API_URL}/formation/add`, formation);
      return response.data;
    } catch (error) {
      console.error('Error adding formation:', error);
      throw error;
    }
  };
  
  export const addStudent = async (student) => {
    try {
      const response = await axios.post(`${API_URL}/etudiant/add`, student);
      return response.data;
    } catch (error) {
      console.error('Error adding student:', error);
      throw error;
    }
  };
  
  // --------------------matiere ----------------------------------------------------------------------------------------------------------

export const getAllMatieres = async () => {
  try {
    const response = await axios.get(`${API_URL}/matiere/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching matieres:', error);
    throw error;
  }
};

export const addMatiere = async (matiere) => {
  try {
    const response = await axios.post(`${API_URL}/matiere/add`, matiere);
    return response.data;
  } catch (error) {
    console.error('Error adding matiere:', error);
    throw error;
  }
};

export const deleteMatiere = async (id) => {
  try {
    await axios.delete(`${API_URL}/matiere/delete`, { params: { id } });
  } catch (error) {
    console.error('Error deleting matiere:', error);
    throw error;
  }
};

export const updateMatiere = async (matiere) => {
  try {
    const response = await axios.put(`${API_URL}/matiere/update`, matiere);
    return response.data;
  } catch (error) {
    console.error('Error updating matiere:', error);
    throw error;
  }
};

export const getClassesByMatiere = async (matiereId) => {
  try {
    const response = await axios.get(`${API_URL}/class/byMatiere`, { params: { matiereId } });
    return response.data;
  } catch (error) {
    console.error('Error fetching classes:', error);
    throw error;
  }
};

export const getMatieresByClass = async (classId) => {
  try {
    const response = await axios.get(`${API_URL}/class/${classId}/matieres`);
    return response.data;
  } catch (error) {
    console.error('Error fetching matieres:', error);
    throw error;
  }
};


export const assignMatiereToClass = async (classId, matiereId, coefMat, nbrHS) => {
  try {
    console.log("Assigning matiere to class with data:", { classId, matiereId, coefMat, nbrHS });
    const response = await axios.post(`${API_URL}/class/${classId}/addMatiere/${matiereId}`, { coefMat, nbrHS });
    return response.data;
  } catch (error) {
    console.error('Error assigning matiere to class:', error);
    throw error;
  }
};



