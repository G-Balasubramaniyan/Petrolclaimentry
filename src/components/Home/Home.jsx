import React, { useState} from 'react'
import './Home.css'
import DataTable from '../Entry/Datatable';
function Home() {
    const [startkm, setstartingkm] = useState('');
    const [endkm, setendkm] = useState('');
    const [totalKm, settotalkm] = useState('');
    const [city, setCity] = useState('');
    const [data, setdata] = useState([]);
    const [date, setdate] = useState('');
    const [workdis, setworkdis] = useState('');
    const [currentkm,setcurrentkm]=useState(0);
    const tamilNaduCities = ['ARIYALUR', 'THIRUCHAMPALLI', 'KOLLUMANGUDI', 'ADUTHURAI', 'MUDIKANDANALLUR', 'KUTHTHALAM', 'THANJAVUR', 'THIRUNAGESWARAM', 'MANALMEDU', 'THIRUCHIRAI', 'AALIYAVAIKAL', 'MANNARGUDI', 'THARKAS', 'PAPANASAM', 'MAYILADUTHURAI', 'ORATHANADU', 'SIRKALI', 'JAYAMKONDAM', 'AYYAMPETTAI']

    const Setstartkm = (event) => {
        const Start = Number(event.target.value);
        let Totalkm=Number(totalKm);
        const End = Start !== '' ? ( Totalkm ? Totalkm + Start : "") : "";
        setstartingkm(event.target.value);
        setendkm(End);
    }
    const Settotalkm = (event) => {
        let Start = Number(startkm);
        let Totalkm=event.target.value;
        const End = Start !== '' ? (Totalkm ? Number(Totalkm) + Start : "") : "";
        setendkm(End);
        settotalkm(Totalkm);
    }
    const handleCityChange = (event) => {
        setCity(event.target.value);
    };
    const handleworkdisupdate = (event) => {
        setworkdis(event.target.value);
    };
    const setDate = (event) => {
        setdate(event.target.value);
    }
    const updatedata = () => {
        let datatoappend = {
            Start: startkm,
            End: endkm,
            Total: totalKm,
            City: city,
            Date: date,
            Work: workdis
        };
        setcurrentkm(endkm+getRandomInt(5,10))
        console.log(currentkm)
        setdata([...data, datatoappend]);
    };
    const Resetform = () => {
        if (currentkm!==0){
            setstartingkm(currentkm)
        }
        [setendkm, settotalkm, setCity, setCity,setworkdis].map(data => {
            data('');
            return '';
        })
    }

    function convertToCSV(){
        const columnOrder = ['Date', 'Start', 'End', 'Total', 'City', 'Work'];

        // Create CSV string with ordered columns
        let csvContent = "S.No,Date,Opng Km Rdng,Clsg km Rdng,Tot Km travelled,Areas Travelled,Work\n";
        data.forEach((item,index) => {
          const row = columnOrder.map(column => item[column]).join(",");
          csvContent += (index+1)+','+row + "\n";
        });
    
        // Create Blob and initiate file download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
        const link = document.createElement("a");
        link.setAttribute("href", URL.createObjectURL(blob));
        link.setAttribute("download", "data.csv");
        document.body.appendChild(link);
        link.click();
    }
    const getRandomInt=(min, max)=> {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }


    return (
        <div className="content">
            <h1 className='Header'>PETROL FORM ENTRY</h1>
            <div className="container mt-1 formdiv">
                <div className='subdivHeader col col-md-12'>
                    <h4 className='p5 head'>Travel Log Form</h4>
                </div>
                <div className="container mt-1 Innercontainer">
                    <form>
                        <div className="row">
                            <div className="form-group col">
                                <label htmlFor='date' className='keylabel'>Date:</label>
                                <input type="date" className="form-control inputelemts" id="date" name="date" onChange={setDate} required></input>
                            </div>
                            <div className="form-group col">
                                <label htmlFor="place" className='keylabel'>Place:</label>
                                <select className="form-control inputelemts" id="place" name="place" onChange={handleCityChange} value={city} required>
                                    <option value="">Select City</option>
                                    {tamilNaduCities.map((city, index) => (
                                        <option key={index} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                                <label className='keylabel'>Work description:</label>
                                <input type="text" className="form-control inputelemts" id="Workdis" name="Workdis" onChange={handleworkdisupdate} value={workdis} required></input>
                            </div>
                        <div className="row">
                            <div className="form-group col">
                                <label htmlFor='startingKm' className='keylabel' >Starting Km:</label>
                                <input type="number" className="form-control inputelemts" placeholder="Starting Km" id="startingKm" name="startingKm" onChange={Setstartkm} value={startkm} required></input>
                            </div>
                            <div className="form-group col">
                                <label className='keylabel'>Km Traveled:</label>
                                <input type="number" className="form-control inputelemts" id="totalKm" name="totalKm" value={totalKm} onChange={Settotalkm} required></input>
                            </div>
                            <div className="form-group col">
                                <label className='keylabel' >Ending Km:</label>
                                <input type="number" className="form-control inputelemts" placeholder="Ending Km" id="endingKm" name="endingKm" value={endkm} readOnly></input>
                            </div>
                        </div>
                        <button type="button" className="btn btn-success button" onClick={updatedata}>Submit</button>
                        <button type="button" className="btn btn-secondary reset button" onClick={Resetform}>Reset</button>
                    </form>
                </div>
                <div className='Convertbutton'>
                    <button className="btn btn-outline-secondary" onClick={convertToCSV}>Convert <i className="bi bi-filetype-csv"></i></button>
                </div>
                <DataTable data={data} itemsPerPage={5} />
            </div>
        </div>
    )
}

export default Home