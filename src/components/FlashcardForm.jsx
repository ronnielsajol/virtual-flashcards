import { useState } from "react";
import PropTypes from "prop-types";
import { supabase } from "../supabaseClient";

const FlashcardForm = ({ onSave }) => {
	const [question, setQuestion] = useState("");
	const [answer, setAnswer] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (question && answer) {
			setLoading(true);
			setError(null);

			// Insert flashcard into Supabase
			const { data, error } = await supabase.from("flashcards").insert([{ question, answer }]).select("*"); // Select all columns to be returned
			setLoading(false);

			if (error) {
				console.error("Error adding flashcard:", error);
				setError("Failed to save flashcard. Please try again.");
			} else if (data && data.length > 0) {
				// Check if data is not null and has at least one element
				onSave(data[0]);
				setQuestion("");
				setAnswer("");
			} else {
				// Handle the case where data is null or empty
				setError("Unexpected error: No data returned from Supabase.");
			}
		}
	};

	return (
		<form className='p-4 bg-gray-100 rounded-lg' onSubmit={handleSubmit}>
			{error && <p className='text-red-500'>{error}</p>}
			<input
				className='w-full p-2 mb-2 border rounded'
				placeholder='Enter Question'
				value={question}
				onChange={(e) => setQuestion(e.target.value)}
				disabled={loading}
			/>
			<input
				className='w-full p-2 mb-2 border rounded'
				placeholder='Enter Answer'
				value={answer}
				onChange={(e) => setAnswer(e.target.value)}
				disabled={loading}
			/>
			<button
				type='submit'
				className={`w-full p-2 text-white bg-blue-500 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
				disabled={loading}>
				{loading ? "Saving..." : "Save Flashcard"}
			</button>
		</form>
	);
};

FlashcardForm.propTypes = {
	onSave: PropTypes.func.isRequired,
};

export default FlashcardForm;
