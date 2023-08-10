import axios from 'axios';

export const matcherCandidatesJob = async(dataJob) => {
    console.log("que trae dataJobs: ", dataJob)
    
    let candidates = [];

    //!Armo las condiciones para consultar los estudiantes con campos clave
    let strStudentHigh='';
    // >>/search/users?type=student&info_skills=Desarrollo web,Bases de datos    
    if(dataJob.levelRequired) strStudentHigh += '&academic_level='+dataJob.levelRequired;
    //if(dataJob.studyArea) strStudentHigh+='&academic_area='+dataJob.studyArea;
    //if(dataJob.skillsRequired) strStudentHigh+='&info_skills='+dataJob.skillsRequired.join(',');
    //if(dataJob.jobGoal) strStudentHigh+='&info_goals='+dataJob.jobGoal.join(',');
    //if(dataJob.benefits) strStudentHigh+='&info_interests='+dataJob.benefits.join(',');
    //console.log("que tiene level_required: ", dataJob.academic.level_required);
    
    let querySt = `http://localhost:3001/api/v1/search/users?type=student`;
    querySt += strStudentHigh;

    console.log("como arma query de Estudiantes: ", querySt);

      try{
        //?TRAIGO DATOS DE CANDIDATOS ESTUDIANTES
        const response = (await axios.get(querySt,{withCredentials: "include"})).data.data;
        console.log("que trae response estudiantes <matcherCandidatesJob>: ", response);
        
        response
          ?candidates = [...response]
          :candidates =[]

      }catch(error){
        console.log("error al traer datos de estudiantes <matcherCandidates>: ", error.message);
      }

    //!Armo las condiciones para consultar los PROFESIONALES con campos clave
    let strProfesionalHigh='';
    // >>/search/users?type=professional&info_skills=Desarrollo web,Bases de datos    
    //if(dataJob.levelRequired) strProfesionalHigh += '&academic_formation='+dataJob.levelRequired;
    //if(dataJob.studyArea) strProfesionalHigh+='&academic_area='+dataJob.studyArea;
    //if(dataJob.benefits) strProfesionalHigh+='&info_interests='+dataJob.benefits.join(',');
    //if(dataJob.skillsRequired) strProfesionalHigh+='&info_skills='+dataJob.skillsRequired.join(',');
    //if(dataJob.jobGoal) strProfesionalHigh+='&info_goals='+dataJob.jobGoal.join(',');
    //console.log("que tiene level_required: ", dataJob.academic.level_required);
    
    let queryPr = `http://localhost:3001/api/v1/search/users?type=professional`;
    queryPr += strProfesionalHigh;

    console.log("como arma query de Profesionales: ", queryPr);

    try{
      //?TRAIGO DATOS DE CANDIDATOS PROFESIONALES
      const responsePr = (await axios.get(queryPr,{withCredentials: "include"})).data.data;
      console.log("que trae response profesionales <matcherCandidatesJob>: ", responsePr);
      
      responsePr
        ?candidates = candidates.concat(responsePr)
        :candidates =[...candidates]

    }catch(error){
      console.log("error al traer datos de profesionales <matcherCandidates>: ", error.message);
    }


    //!Armo las condiciones para consultar estudiantes con campos de media
    // let strStudentLow='';
    // if(dataJob.info.availability) strStudentLow += '&availability='+dataJob.info.availability;
    // if(dataJob.info.languages_required) strStudentLow += '&languages='+dataJob.info.languages_required;
    // if(dataJob.info.job_description) strStudentLow += '&interests='+dataJob.info.job_description;
    // //if(dataJob.info.job_description) strStudentLow += '&city='+dataJob.info.job_description;
    // console.log("condiciones estudiantes media: ", strStudentLow);

    return candidates;
    
};
