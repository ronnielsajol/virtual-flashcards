import { useState, useEffect } from "react";
import FlashcardForm from "./components/FlashcardForm";
import FlashcardList from "./components/FlashcardList";
import { supabase } from "./supabaseClient";

function App() {
	const [flashcards, setFlashcards] = useState([]);

	// Fetch flashcards on component mount
	useEffect(() => {
		const fetchFlashcards = async () => {
			const { data, error } = await supabase.from("flashcards").select("*").order("created_at", { ascending: false });

			if (error) {
				console.error("Error fetching flashcards:", error);
			} else {
				setFlashcards(data);
			}
		};

		fetchFlashcards();
	}, []);

	const handleSave = (newFlashcard) => {
		setFlashcards([newFlashcard, ...flashcards]); // Add new flashcard to the beginning of the list
	};

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold mb-4'>Flashcards</h1>
			<FlashcardForm onSave={handleSave} />
			<FlashcardList flashcards={flashcards} />
		</div>
	);
}

export default App;
