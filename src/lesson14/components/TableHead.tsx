import {THeadCell} from "../Users-homework.styled.tsx";
const tableHeadings: string[] = ['User Name', 'Gender', 'Hair Color', 'Birth date', 'Phone number']

export const TableHead = () => {
    return (
        <thead>
        <tr>
            {tableHeadings.map((heading: string, idx: number) => <THeadCell key={idx}>{heading}</THeadCell>)}
        </tr>
        </thead>
    )
}
