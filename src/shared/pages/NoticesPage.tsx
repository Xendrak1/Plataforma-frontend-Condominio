// Comunicados internos con confirmación de lectura.
import { useNotices } from '../../features/notices/hooks'
import { Table, type TableColumn } from '../components/Table'
import { Loader } from '../components/Loader'
import { Note } from '../components/Note'
import { TableFilter } from '../components/TableFilter'
import { useState } from 'react'

type Row = {
	id: number
	titulo: string
	publico: string
	fecha: string
}

export function NoticesPage() {
	const { data = [], isLoading } = useNotices()
	const [term, setTerm] = useState('')
	const columns: TableColumn<Row>[] = [
		{ header: 'Título', accessor: r => r.titulo },
		{ header: 'Público', accessor: r => r.publico },
		{ header: 'Fecha', accessor: r => r.fecha },
	]

	const filtered = data.filter(n => [n.titulo, n.publico, n.fecha].some(x => x.toLowerCase().includes(term.toLowerCase())))

	return (
		<section>
			<h1>Comunicados</h1>
			<Note>
				Comunicados internos. Luego agregaremos publicación y confirmación de lectura.
			</Note>
			<TableFilter placeholder="Buscar por título o público" onChange={setTerm} />
			{isLoading ? <Loader /> : <Table<Row> columns={columns} data={filtered} />}
		</section>
	)
}


