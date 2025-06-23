import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

//register
export const registerApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/register`, reqBody)
}

//login
export const LoginApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/login`, reqBody)
}

//google login api
export const googleLoginApi = async (reqBody)=>{
    return await commonApi('POST',`${serverUrl}/google-login`,reqBody)
}

//add mood
export const addmoodApi = async(reqBody,reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/add-mood`,reqBody,reqHeader)
}

export const getmoodApi = async () => {
  const token = sessionStorage.getItem('token');
  const reqHeader = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
  return await commonApi('GET', `${serverUrl}/all-moods`, "", reqHeader);
};
//delete mood
export const deleteMoodApi = async (id) => {
  return await commonApi('DELETE', `${serverUrl}/delete-mood/${id}`);
};

//update mood
export const updateMoodApi = async (id, reqBody, reqHeader) => {
    return await commonApi('PUT', `${serverUrl}/update-mood/${id}`, reqBody, reqHeader)
}
//get all users
export const getAllUsersApi = async (reqHeader) => {
    return await commonApi("GET", `${serverUrl}/all-users`, "", reqHeader);
};

//to delete users
export const deleteUserApi = (id, headers) => {
  return commonApi('delete', `${serverUrl}/delete-user/${id}`, null, headers);
};

export const getUsersWithMoodsApi = async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/admin-all-moods`,null,reqHeader)
}

// GET /user-mood-analysis (returns { lineData:[], pieData:[] })
export const getUserMoodAnalysisApi = async (reqHeader) => {
  return await commonApi("GET",`${serverUrl}/user-mood-analysis`,"",reqHeader);
};


// Get total mood journal count (admin)
export const getJournalCountApi = async (reqHeader) => {
  return await commonApi('GET', `${serverUrl}/journals-count`, null, reqHeader);
};

// Get average mood score (admin)
export const getAvgMoodApi = async (reqHeader) => {
  return await commonApi('GET', `${serverUrl}/average-mood`, null, reqHeader);
};

// Get anomalies count (admin)
export const getAnomaliesCountApi = async (reqHeader) => {
  return await commonApi('GET', `${serverUrl}/anomalies-count`, null, reqHeader);
};


export const getProfileApi = async (reqHeader) =>
  commonApi('GET', `${serverUrl}/profile`, "", reqHeader);

export const updateProfileApi = async (body, reqHeader) =>
  commonApi('PUT', `${serverUrl}/profile`, body, reqHeader);

