import React from 'react';
import { useSelector } from 'react-redux';
import LmsTable from './../LmsTable';

const ViewAllBooksTakenByAStudentUsingUsername = () => {
    const username = useSelector((state) => state.auth.username);
    const jwtToken = useSelector((state) => state.auth.jwtToken);
    const apiToFetch = "/student/getAllBooksTakenByAStudent/" + username;
    const columns = [
        {
            selector: (row) => row.bookId,
            name: "ID",
            sortable: true,
        },
        {
            selector: (row) => row.bookName,
            name: "BOOK NAME",
            sortable: true,
        },
        {
            selector: (row) => row.totalAvailability,
            name: "TOTAL AVAILABILITY",
            sortable: true,
        },
        {
            name: "BOOK IMAGE",
            cell: (row) => (
                <img
                    src={row.bookLink}
                    alt="NOT FOUND"
                    style={{ height: "30vh", width: "25vh" }}
                />
            ),
        },
        {
            selector: (row) => row.isbnNo,
            name: "ISBN NO",
            sortable: true,
        }

    ];

    const changeInResponse = null;
    return (
        <>
            <div
                style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <h1 className="custom_font">ALL BOOKS TAKEN BY YOU</h1>
                </div>
                <LmsTable
                    apiToFetch={apiToFetch}
                    columns={columns}
                    changeInResponse={changeInResponse}
                    jwtToken={jwtToken}
                />
            </div>
        </>
    )
}

export default ViewAllBooksTakenByAStudentUsingUsername