import * as XLSX from 'xlsx';
import { Button } from '@mui/material';
import axios from 'axios';
import PeopleIcon from '@mui/icons-material/People';
import { styled } from '@mui/material/styles';
import Swal from 'sweetalert2';

const Input = styled('input')({
    display: 'none',
});

function MassiveInsertButton() {
    const massiveInsert = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;
                const wb = XLSX.read(bufferArray, { type: "buffer" });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws);
                resolve(data);
            }

            fileReader.oneerror = (error) => {
                reject(error);
            }
        });

        promise.then((data) => {
            const userToken = localStorage.getItem('token');

            const users = {
                users: data
            }

            axios.post(`${process.env.REACT_APP_API_URL}/user/employee/many`, users, {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                },
            }).then((res) => {
                Swal.fire({
                    title: 'Colaboradores cadastrados!',
                    text: 'Todos os colaboradores foram cadastrados com sucesso!',
                    icon: 'success',
                    confirmButtonText: 'Valeu!'
                });
            }).catch(function (error) {
                Swal.fire({
                    title: 'Houve um erro :(',
                    text: 'Cheque as informações da sua planilha, verifique se o usuário já não está cadastrado.',
                    icon: 'error',
                    confirmButtonText: 'Que pena!'
                });
            });
        });
    }

    return (
        <label htmlFor="contained-button-file">
            <Input
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                id="contained-button-file"
                multiple
                type="file"
                onChange={(e) => massiveInsert(e.target.files[0])}
            />
            <Button
                variant="contained"
                sx={{ py: 1 }}
                color="success"
                fullWidth
                component="span"
            >
                <PeopleIcon />&nbsp;Inserir&nbsp;Massa
            </Button>
        </label>

    );
}

export default MassiveInsertButton;