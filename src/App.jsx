import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [api, setAPI] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('https://strapi-rygs.onrender.com/api/prodis');
      // console.log(res.data.data[0].attributes.prodi[0]);
      setAPI(res.data.data[0].attributes.prodi[0]);
    };

    fetchData();
  }, []);

  return (
    <div>
      {api.map((prodi) => {
        return (
          <div key={prodi.kode_prodi} >
            <p>{prodi.nama_prodi}</p>
            <p>Kepala : {prodi.kepala_prodi}</p>
            {prodi.sektretaris ? <p>Sekretaris : {prodi?.sektretaris}</p> : null}
            {prodi.mahasiswa.map((mahasiswa) => (
              <div key={mahasiswa.tahun_masuk}>
                <br />
                Angkatan : {mahasiswa.tahun_masuk}
                {Object.keys(mahasiswa.data).map((item, i) => (
                  <div>
                    <br />
                    kelas : {item}
                    {mahasiswa.data[item].length != 0 ? (
                      mahasiswa.data[item].map((listMahasiswa, index) => (
                        <div>
                          <table border={'1px'}>
                            <tr>
                              <th>NPM</th>
                              <th>Nama</th>
                              <th>Alamat</th>
                              <th>Jenis Kelamin</th>
                              <th>Hobi</th>
                            </tr>
                            <tr>
                              <td>{mahasiswa.tahun_masuk.substring(2, 4) + (parseInt(mahasiswa.tahun_masuk.substring(2, 4)) + 4) + prodi.kode_prodi + '00' + parseInt('00') + parseInt(index + 1)}</td>
                              <td>{listMahasiswa.nama}</td>
                              <td>{listMahasiswa.alamat}</td>
                              <td>{listMahasiswa.jenis_kelamin}</td>
                              <td>
                                <span>{(i.hobi ? ' ,' : '') + listMahasiswa.hobi}</span>
                              </td>
                            </tr>
                          </table>
                        </div>
                      ))
                    ) : (
                      <p>Tidak ada Mahasiswa yang mengambil kelas ini.</p>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
export default App;
