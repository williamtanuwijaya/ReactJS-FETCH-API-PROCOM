import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Mahasiswa() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);

  const fetchData = async (tahunAjaran, tahunLulus, kodeProdi, idMahasiswa) => {
    const res = await axios.get('https://strapi-rygs.onrender.com/api/prodis/');
    // console.log(res.data.data[0].attributes.prodi[0]);
    const prodi = res.data.data[0].attributes.prodi[0].find((e) => e.kode_prodi === kodeProdi);
    // console.log('prodi', prodi);
    const kelasMap = prodi.mahasiswa.find((e) => e.tahun_masuk === `20${tahunAjaran}`);
    // console.log('kelasmap', kelasMap);

    let mahasiswa;
    //Manggil object Object.keys(kelasMap.data)
    // Object.keys(kelasMap.data).find(e=> {
    //   const listMahasiswa = kelasMap.data[e];
    // })

    console.log(Object.keys(kelasMap.data));
    for (const kelas in kelasMap.data) {
      const listMahasiswa = kelasMap.data[kelas];
      mahasiswa = listMahasiswa.find((e) => e.id === idMahasiswa);
      if (mahasiswa !== undefined) {
        break;
      }
    }

    setData(mahasiswa);
    setDataFetched(true);
    console.log(mahasiswa);
  };

  useEffect(() => {
    console.log(id);
    // 2125240001
    if (id.length !== 10) {
      setDataFetched(true);
      return;
    }
    console.log('parsing npm');

    const tahunAjaran = id.slice(0, 2);
    const tahunLulus = id.slice(2, 4);
    const kodeProdi = +id.slice(4, 6);
    const idMahasiswa = +id.slice(6);
    console.log(tahunAjaran, tahunLulus, kodeProdi, idMahasiswa);

    fetchData(tahunAjaran, tahunLulus, kodeProdi, idMahasiswa);
  }, []);

  if (!dataFetched) {
    return null;
  }
  if (!data) {
    return <div>Data Mahasiswa tidak diketemukan.</div>;
  }
  return (
    <div>
      <h1>Detail Data Mahasiswa</h1>
      <h3>NPM: {data.id}</h3>
      <h3>Nama: {data.nama}</h3>
      <h3>Jenis Kelamin: {data.jenis_kelamin === 'L' ? 'Laki-laki' : data.jenis_kelamin === 'P' ? 'Perempuan' : 'Tidak Diketahui'}</h3>
      <h3>Alamat: {data.alamat}</h3>
      <h3>Hobi: {data.hobi.join(', ')}</h3>
    </div>
  );
}

export default Mahasiswa;
