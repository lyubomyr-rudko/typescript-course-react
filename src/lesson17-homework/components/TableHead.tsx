import {THeadCell} from "./Components.styled.tsx";
const tableHeadings: string[] = ['User Name', 'Gender', 'Eye Color', 'Age', 'Phone number']

export const TableHead = () => {
    return (
        <thead>
        <tr>
            {tableHeadings.map((heading: string, idx: number) => <THeadCell key={idx}>{heading}</THeadCell>)}
        </tr>
        </thead>
    )
}
