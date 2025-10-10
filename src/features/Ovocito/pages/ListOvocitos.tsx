import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import OvocitosTable from "../components/OvocitosTable";
import OvocitosTableSkeleton from "../components/OvocitosTableSkeleton";
import type { EstadoOvocito, Ovocito as OvocitoRow } from "../../../types/Ovocito";
import OvocitoModalForm from "../components/OvocitoModalForm";

// Mock de pacientes
const pacientes = [
	{ id: "1", nombre: "Ana", apellido: "Gomez" },
	{ id: "2", nombre: "Luis", apellido: "Perez" },
	{ id: "3", nombre: "Maria", apellido: "Lopez" },
];

// Mock de ovocitos por paciente
// Nota: Los ovocitos se obtienen desde la API al seleccionar paciente

export default function ListOvocitosPage() {
	const [selectedPacienteId, setSelectedPacienteId] = useState<string>("");
	const [ovocitos, setOvocitos] = useState<OvocitoRow[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [modalOpen, setModalOpen] = useState(false);

	// Actualizar ovocitos al seleccionar paciente
	const handlePacienteChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		const id = e.target.value;
		setSelectedPacienteId(id);
	};

	// obtener nombre/apellido del paciente seleccionado
	const paciente = useMemo(() => pacientes.find(p => p.id === selectedPacienteId), [selectedPacienteId]);

	// Fetch de ovocitos al seleccionar paciente
	useEffect(() => {
		const fetchOvocitos = async () => {
			if (!selectedPacienteId || !paciente) return;
			setLoading(true);
			setError(null);
			try {
				// Traer todos los ovocitos y filtrar por prefijo del identificador del paciente
				const { data } = await axios.get("/api/ovocitos/");

				// data puede ser lista u objeto con results; contemplar ambos
				const items = Array.isArray(data) ? data : (data.results ?? []);
				// Mapeo backend -> frontend
				// backend: { identificador, estado: muy_inmaduro|inmaduro|maduro, cripreservar, descartado }
				// frontend: { identificador_ovocito, estado: "muy inmaduro"|..., criopreservar, descartado }
				const estadoBackendToFront = (e: string): EstadoOvocito => (e || "").replace(/_/g, " ") as EstadoOvocito;
				const ap = (paciente.apellido || "").slice(0,3).toUpperCase();
				const nom = (paciente.nombre || "").slice(0,3).toUpperCase();

				const mapped: OvocitoRow[] = items
				  .filter((it: any) => typeof it?.identificador === 'string')
				  .filter((it: any) => it.identificador.includes(`_${ap}_${nom}_`))
				  .map((it: any) => ({
					  identificador_ovocito: it.identificador,
					  estado: estadoBackendToFront(it.estado),
					  criopreservar: !!it.cripreservar,
					  descartado: !!it.descartado,
				  }));
				setOvocitos(mapped);
			} catch (err: any) {
				const msg = err?.response?.data?.detail || err?.message || "Error al obtener ovocitos";
				setError(msg);
				setOvocitos([]);
			} finally {
				setLoading(false);
			}
		};
		fetchOvocitos();
	}, [selectedPacienteId, paciente?.nombre, paciente?.apellido]);

	// Callbacks para tabla
	const handleEstadoChange = (id: string, estado: EstadoOvocito) => {
		setOvocitos(ovocitos => ovocitos.map(o => o.identificador_ovocito === id ? { ...o, estado } : o));
	};
	const handleCriopreservarChange = (id: string, value: boolean) => {
		setOvocitos(ovocitos => ovocitos.map(o => o.identificador_ovocito === id ? { ...o, criopreservar: value } : o));
	};
	const handleDescartadoChange = (id: string, value: boolean) => {
		setOvocitos(ovocitos => ovocitos.map(o => o.identificador_ovocito === id ? { ...o, descartado: value } : o));
	};

	// Agregar ovocito
	const handleAddOvocito = (nuevo: OvocitoRow) => {
		setOvocitos(ovocitos => [...ovocitos, nuevo]);
	};

	return (
		<section className="pt-20 pb-8 px-2 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-50 to-rose-100 min-h-screen">
		<div className="max-w-3xl mx-auto py-10 bg-white p-6 rounded-lg shadow">
			<h1 className="text-2xl font-bold mb-6 text-black">Listado de Ovocitos por Paciente</h1>
			<div className="mb-6">
				<label className="block mb-2 text-black font-medium">Seleccionar paciente</label>
				<select
					value={selectedPacienteId}
					onChange={handlePacienteChange}
					className="border border-black rounded px-3 py-2 w-full"
				>
					<option className="text-black" value="">-- Selecciona un paciente --</option>
					{pacientes.map(p => (
						<option key={p.id} value={p.id}>
							{p.apellido}, {p.nombre}
						</option>
					))}
				</select>
			</div>
			{selectedPacienteId && (
				<>
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-lg text-black font-semibold">Ovocitos de {paciente?.nombre} {paciente?.apellido}</h2>
						<button
							onClick={() => setModalOpen(true)}
							className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
						>
							Agregar ovocito
						</button>
					</div>
										<div className="overflow-x-auto rounded-lg shadow min-h-[220px]">
												{loading ? (
													<OvocitosTableSkeleton rows={4} />
												) : error ? (
													<div className="p-4 text-red-700">{error}</div>
												) : (
													<OvocitosTable
															ovocitos={ovocitos}
															onEstadoChange={handleEstadoChange}
															onCriopreservarChange={handleCriopreservarChange}
															onDescartadoChange={handleDescartadoChange}
													/>
												)}
										</div>
					<OvocitoModalForm
						open={modalOpen}
						onClose={() => setModalOpen(false)}
						onAdd={handleAddOvocito}
						nombreDonante={paciente?.nombre || ""}
						apellidoDonante={paciente?.apellido || ""}
					/>
				</>
			)}
		</div>
		</section>
	);
}