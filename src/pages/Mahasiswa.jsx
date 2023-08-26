import { useParams } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";

export default function Mahasiswa() {
  const generateNPM = useParams();

  const [data, setData] = useState(null);
  const fetchData = async () => {
    const res = await axios.get('https://strapi-rygs.onrender.com/api/prodis');
    console.log(res.data.data[0].attributes.prodi[0].kode_prodi);
    setData(res.data.data[0].attributes.prodi[0]);
  };

  useEffect(() => {
    fetchData(generateNPM);
  }, []);
  
  return (
    <div>
      <h1>Detail Data Mahasiswa</h1>
      <h3>NPM : {generateNPM.id}</h3>
      {/* <h3>Jenis Kelamin :{jenis_kelamin}</h3>
      <h3>Alamat :{alamat}</h3>
      <h3>Hobi :{hobi}</h3> */}
    </div>
  )
}
