import { Table, TableBody, TableFooter, TablePagination, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function DenseTable(props) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const { userName } = props;

  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const checkAdministrator = (isAdmin) => {
    return isAdmin ? 'Sim' : 'Não';
  }

  const getUsers = async (userName) => {
    const userToken = localStorage.getItem('token');

    const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/employee?name=${userName}`, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      },
    });
    setUsers(response.data.users);

    return response.data.users;
  }

  const editUser = (userId) => {
    navigate('/user/edit', { state: userId });
  }

  const removeUser = (userId) => {
    const userToken = localStorage.getItem('token');
    Swal.fire({
      title: 'remover este colaborador?',
      text: 'Essa ação não poderá ser desfeita.',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d32f2f'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${userToken}`
          },
        }).then(res => {
          Swal.fire('Removido com sucesso!', '', 'success');
          getUsers('');
        })
      }
    })
  }

  useEffect(() => {
    getUsers(userName)
  }, [userName]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 100 }} size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Nome</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Administrador</TableCell>
            <TableCell align="center">Editar</TableCell>
            <TableCell align="center">Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((user) => (
              <TableRow
                key={user._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" align="left" scope="row">{user.name}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{checkAdministrator(user.isAdmin)}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    sx={{ py: 0.6 }}
                    color="info"
                    onClick={() => { editUser(user._id) }}
                  >
                    <EditIcon />
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    sx={{ py: 0.6 }}
                    color="error"
                    onClick={() => { removeUser(user._id) }}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 66.2 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5]}
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default DenseTable;