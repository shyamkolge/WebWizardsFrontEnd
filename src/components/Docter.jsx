import React from "react";
import profileImg from "../assets/profile.svg";
import { FaEdit, FaEye, FaFilePdf } from 'react-icons/fa';
import { useEffect , useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import EditReport from './Report/EditReport.jsx'
import ViewReport from './Report/ViewReport.jsx'
import useAuth from "../hooks/useAuth.js";

const Docter = () => {
 
    const { reportId } = useParams()
    const  [data, setData] = useState({})
    const [report , setReport ] = useState([])
    const { viewReport, setViewReport, editReport, setEditReport} = useAuth()
    const [isEditing, setIsEditing] = useState(false);

    console.log(reportId);

    useEffect(()=>{
       
        axios.get(`/v1/report/user/${reportId}`)
        .then((response)=> {
            setData(response.data.data.userBelongingToReport[0])
            console.log(response.data.data.patientReport);
            setReport(response.data.data.patientReport)
        })
        .catch((error)=> console.log(error))

    }, [])

    const handleCancelEdit = () => {
      setIsEditing(false);
  };

  const handleEditPdf = () => {
    setReport(prevReport => prevReport.map(r => ({ ...r }))); // Forces a re-render
};


  const handleEditNote = () => {
    setIsEditing(true);
    handleEditPdf();
};


const updateReport = (updatedReport) => {
  const updatedReportIndex = report.findIndex(r => r._id === updatedReport._id);
  if (updatedReportIndex !== -1) {
      const updatedReportList = [...report];
      updatedReportList[updatedReportIndex] = updatedReport;
      setReport(updatedReportList);
  }
};
  return (
    <div className="bg-[#f5f5f5] p-10 flex flex-col justify-center items-center ">

      <div className="bg-white flex flex-col gap-5 border rounded-lg w-[80%] h-full p-5">
        {/* <div className='flex justify-end'>
                            <FaEdit size={30} className="text-blue-500 cursor-pointer hover:text-blue-700" onClick={() => setEditProfile(prev => !prev)} />
                        </div> */}
        <div className="flex gap-5">
          <div className="">
            <img src={profileImg} alt="" className="w-1/2 mx-auto" />
          </div>
          <div className="border rounded-lg p-3 flex flex-col gap-4 w-full">
            <h1 className="text-3xl font-bold">{data.firstName} {data.middleName} {data.lastName}</h1>
            <div className="flex gap-5">
              <p>Phone</p>
              <p className="font-semibold">{data.mobileNum}</p>
            </div>
            <div className="flex gap-5">
              <p>Sex</p>
              <p className="font-semibold">{data.gender}</p>
            </div>
          </div>
        </div>
        <div className="border p-3 rounded-lg flex flex-col gap-3">
          <h1 className="text-2xl text-gray-400 font-bold">PERSONAL DETAILS</h1>
          <div className="flex justify-between">
            <div>
              <p>FullName</p>
              <p className="font-bold">{data.firstName} {data.middleName} {data.lastName}</p>
            </div>
            <div>
              <p>BirthDate</p>
              <p className="font-bold">{data.dob}</p>
            </div>
            <div>
              <p>Weight</p>
              <p className="font-bold">{data.weight} kg</p>
            </div>
            <div>
              <p>Height</p>
              <p className="font-bold">{data.height} cm</p>
            </div>
          </div>
          <div>
            <div>
              <p>Address</p>
              <p className="font-bold">{data.address}</p>
            </div>
          </div>
          <h1 className="text-2xl text-gray-400 font-bold">MEDICAL DETAILS</h1>
          <div className="flex gap-14">
            <div>
              <p>Blood Group</p>
              <p className="font-bold">{data.bloodGroup}</p>
            </div>
            <div>
              <p>Disease</p>
              <p className="font-bold">{data.diseases}</p>
            </div>
          </div>
        </div>
      </div>


     
      <div className=" rounded-md mt-3 bg-white w-[80%] p-5 flex justify-center flex-col gap-5 items-center">
        {
             report.map((rep)=>(
              <div className="flex rounded-md border p-2 pl-4 pr-4 w-[70%] justify-between">
              <div>
                <FaFilePdf size={30} className="text-red-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">{rep.title}</h1>
              </div>
              <div className="flex gap-3 justify-center items-center">
                <FaEdit
                  size={26}
                  className="text-green-600 cursor-pointer"
                  onClick={handleEditNote}
                />
                <FaEye
                  size={26}
                  className="text-blue-600 cursor-pointer"
                  onClick={() => setViewReport((prev) => !prev)}
                />
              </div>
              {isEditing && (
                <EditReport
                  reportDetails={rep}
                  onCancelEdit={handleCancelEdit}
                  onUpdateReport={updateReport}
                />
              )}
              {viewReport && <ViewReport reportId={rep?._id} />}
              {/* {sendEmail && <SendEmail reportId={r?._id} />} */}
            </div>

       ))


        }
      
      </div>
    </div>
  );
};

export default Docter;
