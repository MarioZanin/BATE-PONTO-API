import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Button } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';

function ExampleMassiveInsertButton() {
    const exportExample = async () => {
        const exampleData = [
            {
                name: "teste",
                email: "teste@gmail.com",
                password: "123456",
                cellphone: "(13) 98155-2312",
                cpf: "575.492.080-69",
                isAdmin: false
            },
            {
                name: "teste123",
                email: "teste123@gmail.com",
                password: "123456",
                cellphone: "(13) 98112-5312",
                cpf: "531.735.470-63",
                isAdmin: true
            }
        ]

        const fileType = "xlsx";
        const ws = XLSX.utils.json_to_sheet(exampleData);
        const wb = { Sheets: { Exemplo: ws }, SheetNames: ["Exemplo"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, `Planilha-Exemplo.xlsx`);
    }

    return (
        <Button
            variant="contained"
            sx={{ py: 1 }}
            color="info"
            fullWidth
            onClick={exportExample}
        >
            <ArticleIcon />&nbsp;Exemplo
        </Button>
    );
}

export default ExampleMassiveInsertButton;