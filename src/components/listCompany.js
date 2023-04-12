// import DataTable from 'react-data-table-component';
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   approveCompany,
//   deleteCompany,
//   getAllCompany,
//   listAllUsers,
//   Listbooks,
// } from '../actions';
// import { Link } from 'react-router-dom';
// import Service from '../api/service';
// import styled from 'styled-components';

// const DATATABLE = styled(DataTable)`
//   font-size: 2rem;
// `;
// let datasmap;
// const ListCompany = () => {
//   useEffect(() => {
//     dispatch(getAllCompany());
//   }, []);
//   const customStyles = {
//     rows: {
//       style: {
//         minHeight: '48px',
//       },
//     },
//     headCells: {
//       style: {
//         backgroundColor: '#f5f5f5',
//         fontSize: '15px',
//       },
//     },
//     cells: {
//       style: {
//         fontSize: '15px',
//       },
//     },
//   };
//   const dispatch = useDispatch();

//   const { allCompany } = useSelector((e) => e.Reducer);
//   const columns = [
//     {
//       name: 'Name',
//       selector: (row) => row.name,
//     },
//     {
//       name: 'contact_name',
//       selector: (row) => row.contact_name,
//     },
//     {
//       name: 'status',
//       selector: (row) => row.status,
//     },
//     {
//       name: 'status',
//       selector: (row) =>
//         row.status === 'pending' ? (
//           <>
//             <Link
//               to={`/company/approve/${row.id}`}
//               type="button"
//               onClick={() => dispatch(Service.approveCompany(row.id))}
//               className="btn btn-success"
//             >
//               Approve
//             </Link>
//             <Link
//               to={`/company/reject/${row.id}`}
//               type="button"
//               onClick={() => dispatch(Service.approveCompany(row.id))}
//               className="btn btn-danger"
//             >
//               reject
//             </Link>
//             <Link
//               to={`/company/list/${row.id}`}
//               type="button"
//               onClick={() => dispatch(Service.approveCompany(row.id))}
//               className="btn btn-success"
//             >
//               Edit
//             </Link>
//             <Link
//               to={`/company/approve/${row.id}`}
//               type="button"
//               onClick={() => dispatch(Service.approveCompany(row.id))}
//               className="btn btn-success"
//             >
//               Delete
//             </Link>
//           </>
//         ) : row.status === 'Accepted' ? (
//           <>
//             <Link
//               to={`/company/approve/reject`}
//               type="button"
//               onClick={() => dispatch(Service.approveCompany('reject'))}
//               className="btn btn-danger"
//             >
//               reject
//             </Link>
//             <Link
//               to={`/company/${row.id}`}
//               type="button"
//               onClick={() => dispatch(Service.approveCompany(row.id))}
//               className="btn btn-warning"
//             >
//               Edit
//             </Link>
//             <Link
//               type="button"
//               onClick={() => dispatch(deleteCompany(row.id))}
//               className="btn btn-info"
//             >
//               Delete
//             </Link>
//           </>
//         ) : (
//           <>
//             <Link
//               to={`/company/approve/${row.id}`}
//               type="button"
//               onClick={() => dispatch(Service.approveCompany(row.id))}
//               className="btn btn-success"
//             >
//               Approve
//             </Link>
//             <Link
//               to={`/company/list/${row.id}`}
//               type="button"
//               onClick={() => dispatch(Service.approveCompany(row.id))}
//               className="btn btn-success"
//             >
//               Edit
//             </Link>
//           </>
//         ),
//     },
//   ];
//   const datas = allCompany.map((data) => {
//     console.log('data', data);
//     return {
//       id: data._id,
//       name: data.name,
//       email: data.email,
//       contact_phone_number: data.contact_phone_number,
//       address: data.address,
//       contact_name: data.contact_name,
//       status: data.status,
//     };
//   });
//   console.log('datas', datas);

//   console.log('datasmap', datasmap);

//   console.log('allCompany', allCompany);
//   return (
//     <div>
//       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//         <h4 style={{ color: 'red', fontWeight: 'bold', margin: '2% 0% 0% 0%' }}>
//           Company
//         </h4>
//       </div>
//       <DATATABLE columns={columns} data={datas} customStyles={customStyles} />
//     </div>
//   );
// };

// export default ListCompany;

import DataTable from 'react-data-table-component';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  approveCompany,
  deleteCompany,
  getAllCompany,
  getCompanyById,
  listAllUsers,
  Listbooks,
} from '../actions';
import { Link } from 'react-router-dom';
import Service from '../api/service';
import styled from 'styled-components';

const DATATABLE = styled(DataTable)`
  font-size: 2rem;
`;
let datasmap;
const ListCompany = () => {
  const { permissionDesignation } = useSelector((e) => e.Reducer);

  const PermissionAssigned = localStorage.getItem('permissions');
  let array = JSON.parse(PermissionAssigned)?.filter(
    (item) => item._id === 'Company'
  );
  let permissionAllowed = array[0]?.Permission_subMenu;
  useEffect(() => {
    dispatch(getAllCompany());
  }, []);
  const customStyles = {
    rows: {
      style: {
        minHeight: '48px',
      },
    },
    headCells: {
      style: {
        backgroundColor: '#f5f5f5',
        fontSize: '15px',
      },
    },
    cells: {
      style: {
        fontSize: '15px',
      },
    },
  };
  const dispatch = useDispatch();

  const { allCompany } = useSelector((e) => e.Reducer);
  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
    },
    {
      name: 'contact_name',
      selector: (row) => row.contact_name,
    },
    {
      name: 'status',
      selector: (row) => row.status,
    },
    {
      name: 'status',
      selector: (row) =>
        row.status === 'pending' ? (
          <>
            <div>
              <Link
                to={`/company/approve/${row.id}`}
                type="button"
                onClick={() => dispatch(Service.approveCompany(row.id))}
                className="btn btn-success"
              >
                Approve
              </Link>
              <Link
                to={`/company/reject/${row.id}`}
                type="button"
                onClick={() => dispatch(Service.approveCompany(row.id))}
                className="btn btn-danger"
              >
                reject
              </Link>
            </div>
            {permissionAllowed?.includes('Edit') ? (
              <>
                <Link
                  to={`/company/list/${row.id}`}
                  type="button"
                  onClick={() => Service.getCompanyById(row.id)}
                  className="btn btn-success"
                >
                  Edit
                </Link>
              </>
            ) : null}
            {permissionAllowed?.includes('Delete') ? (
              <>
                <Link
                  to={`/company/approve/${row.id}`}
                  type="button"
                  className="btn btn-success"
                >
                  Delete
                </Link>
              </>
            ) : null}
          </>
        ) : row.status === 'Accepted' ? (
          <>
            <Link
              to={`/company/approve/reject`}
              type="button"
              onClick={() => dispatch(Service.approveCompany('reject'))}
              className="btn btn-danger"
            >
              reject
            </Link>
            {permissionAllowed?.includes('Edit') ? (
              <>
                <Link
                  to={`/company/${row.id}`}
                  type="button"
                  onClick={() => Service.getCompanyById(row.id)}
                  className="btn btn-warning"
                >
                  Edit
                </Link>
              </>
            ) : null}
            {permissionAllowed?.includes('Delete') ? (
              <>
                <Link
                  type="button"
                  onClick={() => dispatch(deleteCompany(row.id))}
                  className="btn btn-info"
                >
                  Delete
                </Link>
              </>
            ) : null}
          </>
        ) : (
          <>
            <Link
              to={`/company/approve/${row.id}`}
              type="button"
              onClick={() => dispatch(Service.approveCompany(row.id))}
              className="btn btn-success"
            >
              Approve
            </Link>
            {permissionAllowed?.includes('Edit') ? (
              <>
                <Link
                  to={`/company/list/${row.id}`}
                  type="button"
                  onClick={() => Service.getCompanyById(row.id)}
                  className="btn btn-success"
                >
                  Edit
                </Link>
              </>
            ) : null}
          </>
        ),
    },
  ];
  const datas = allCompany.map((data) => {
    return {
      id: data._id,
      name: data.name,
      email: data.email,
      contact_phone_number: data.contact_phone_number,
      address: data.address,
      contact_name: data.contact_name,
      status: data.status,
    };
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h4 style={{ color: 'red', fontWeight: 'bold', margin: '2% 0% 0% 0%' }}>
          Company
        </h4>
      </div>
      <DATATABLE columns={columns} data={datas} customStyles={customStyles} />
    </div>
  );
};

export default ListCompany;
