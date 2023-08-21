import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [api, setAPI] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('https://strapi-rygs.onrender.com/api/prodis');
      // setQuotes(res.data.data);
      console.log(res.data.data[0].attributes.prodi[0]);
      setAPI(res.data.data[0].attributes.prodi[0]);
    };

    fetchData();
  }, []);

  // return (
  // <div>
  //   {quotes?.map((item, index) => (
  //     <div>
  //       {item.attributes.Quote}
  //       <br /> - {item.attributes.Author}
  //       <br />
  //     </div>
  //   ))}
  // </div>
  // );

  return (
    <div>
      {api.map((prodi) => {
        return (
          <div key={prodi.kode_prodi}>
            <p>{prodi.nama_prodi}</p>
            <p>{prodi.kepala_prodi}</p>
            <p>{prodi?.sektretaris}</p>
            {prodi.mahasiswa &&
              prodi.mahasiswa.map((mahasiswa) => (
                <div key={prodi.kode_prodi}>
                  {mahasiswa.tahun_masuk}
                  {/* {console.log(mahasiswa.data.pagi[2].nama)} */}
                  <br />
                  {mahasiswa.data.pagi[0].nama}
                  <br />
                  {mahasiswa.data.pagi[0].id}
                  <br />
                  {mahasiswa.data.pagi[0].jenis_kelamin}
                  <br />
                  {mahasiswa.data.pagi[0].alamat}
                  <br />
                  {mahasiswa.data.pagi[0].hobi}
                  <br />
                  {mahasiswa.data.pagi[1].nama}
                  <br />
                  {mahasiswa.data.pagi[1].id}
                  <br />
                  {mahasiswa.data.pagi[1].jenis_kelamin}
                  <br />
                  {mahasiswa.data.pagi[1].alamat}
                  <br />
                  {mahasiswa.data.pagi[1].hobi}
                  
                  <br />
                  {mahasiswa.data.pagi[2].nama}
                  <br />
                  {mahasiswa.data.pagi[2].id}
                  <br />
                  {mahasiswa.data.pagi[2].jenis_kelamin}
                  <br />
                  {mahasiswa.data.pagi[2].alamat}
                  <br />
                  {mahasiswa.data.pagi[2].hobi}
                  <br />
                  {mahasiswa.data.malam[0].nama}
                  {mahasiswa.data.malam[0].id}
                  {mahasiswa.data.malam[0].jenis_kelamin}
                  {mahasiswa.data.malam[0].alamat}
                  {mahasiswa.data.malam[0].hobi}
                  <br />
                  {mahasiswa.data.malam[1].nama}
                  {mahasiswa.data.malam[1].id}
                  {mahasiswa.data.malam[1].jenis_kelamin}
                  {mahasiswa.data.malam[1].alamat}
                  {mahasiswa.data.malam[1].hobi}
                  <br />
                  {mahasiswa.data.cuti.data}
                  {/* {mahasiswa.data.pagi[2].nama} */}
                  <br />
                  <br />
                </div>
              ))}

            {prodi.mahasiswa.data &&
              prodi.mahasiswa.data.map((kelas) => (
                <div key={prodi.kode_prodi}>
                  {kelas.nama}
                  <br />
                </div>
              ))}
          </div>
        );
      })}
    </div>
  );
}
export default App;
