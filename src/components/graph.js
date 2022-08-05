import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-3";
import Swal from 'sweetalert2'

export default function Graph() {
    const [graphData, setGraphData] = useState()
    const [filter, setFilter] = useState({
        enodebId: undefined,
        cellId: undefined,
        startDate: undefined,
        endDate: undefined
    })

    useEffect(() => {
        fetch(`http://localhost:3001/`)
            .then((response) => {
                if (!response.ok) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Not found',
                        icon: 'error',
                        confirmButtonText: 'Back'
                    })
                }
                return response.json()
            })
            .then((data) => {
                setGraphData(data)
            });
    }, [])

    const fetchFilteredData = (query) => {
        fetch(`http://localhost:3001?${query}`)
            .then((response) => {
                if (!response.ok) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Not found',
                        icon: 'error',
                        confirmButtonText: 'Back'
                    })
                }
                return response.json()
            })
            .then((data) => {
                console.log(data, '<<<<<<<');
                if (!data.length) {
                    Swal.fire({
                        title: 'Not Found!',
                        status: '403',
                        text: 'Try to change filter',
                        icon: 'error',
                        confirmButtonText: 'Back'
                    })
                }
                setGraphData(data)
            });
    }

    const handleFilter = (e) => {
        e.preventDefault()
        console.log(filter);
        let query = ''
        if (filter.enodebId && !filter.cellId && !filter.startDate) {
            query = `enodebId=${filter.enodebId}`
            fetchFilteredData(query)
        }
        if (filter.cellId && !filter.enodebId && !filter.startDate) {
            query = `cellId=${filter.cellId}`
            fetchFilteredData(query)
        }
        if (filter.cellId && filter.enodebId && !filter.startDate) {
            query = `cellId=${filter.cellId}&enodebId=${filter.enodebId}`
            fetchFilteredData(query)
        }
        if (filter.startDate && !filter.endDate) {
            Swal.fire({
                title: 'Error!',
                text: 'Please fill the end date too',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
        if (filter.startDate && filter.endDate) {
            query = `startDate=${filter.startDate}&endDate=${filter.endDate}`
            fetchFilteredData(query)
        }
        if (filter.startDate && filter.endDate && filter.enodebId && !filter.cellId) {
            query = `enodebId=${filter.enodebId}&startDate=${filter.startDate}&endDate=${filter.endDate}`
            fetchFilteredData(query)
        }
        if (filter.startDate && filter.endDate && filter.cellId && !filter.enodebId) {
            query = `cellId=${filter.cellId}&startDate=${filter.startDate}&endDate=${filter.endDate}`
            fetchFilteredData(query)
        }
        if (filter.startDate && filter.endDate && filter.cellId && filter.enodebId) {
            query = `enodebId=${filter.enodebId}&cellId=${filter.cellId}&startDate=${filter.startDate}&endDate=${filter.endDate}`
            fetchFilteredData(query)
        }
    }

    let labels = []
    let dataSets = []
    graphData?.forEach(el => {
        labels.push(el.resultTime)
        dataSets.push((el.availDur / 900) * 100)
    });
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Availability",
                data: dataSets,
                lineTension: 0,
                fill: false,
                pointBackgroundColor: "rgb(14 165 233)",
                borderColor: "rgb(14 165 233)"
            }
        ]
    };

    const options = {
        legend: {
            display: true,
            position: "bottom"
        }
    };

    return (
        <div>
            <div className=' text-left ml-20 mt-4'>
                <p className="text-2xl font-bold text-slate-800 text-left mt-10">Filter By</p>
                <form onSubmit={handleFilter}>
                    <label>EnodebID</label>
                    <input
                        value={filter.enodebId}
                        onChange={(e) => {
                            setFilter({
                                ...filter,
                                enodebId: e.target.value
                            })
                        }}
                        type="number" name='enodebId' className='ml-1 mr-3' />
                    <label>CellID</label>
                    <input
                        value={filter.cellId}
                        onChange={(e) => {
                            setFilter({
                                ...filter,
                                cellId: e.target.value
                            })
                        }}
                        type="number" name='cellId' className='ml-1 mr-3' />
                    <label>Start Date</label>
                    <input className='ml-1 mr-3'
                        type="date"
                        onChange={(e) => {
                            setFilter({
                                ...filter,
                                startDate: e.target.value
                            })
                        }}
                    />
                    <label>End Date</label>
                    <input className='ml-1 mr-3'
                        type="date"
                        onChange={(e) => {
                            setFilter({
                                ...filter,
                                endDate: e.target.value
                            })
                        }}
                    />
                    <button type='submit' value="Submit" className='rounded-full p-2 px-4 text-white bg-sky-500 hover:bg-sky-300'>Submit</button>
                </form>
            </div>
            <Line data={data} options={options} className="bg-white" />
        </div>
    );
}