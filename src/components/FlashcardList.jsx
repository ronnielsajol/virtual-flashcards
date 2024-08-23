import PropTypes from "prop-types";
import Flashcard from "./Flashcard";

const FlashcardList = ({ flashcards }) => {
	return (
		<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
			{flashcards.map((flashcard) => (
				<Flashcard key={flashcard.id} question={flashcard.question} answer={flashcard.answer} />
			))}
		</div>
	);
};

FlashcardList.propTypes = {
	flashcards: PropTypes.array.isRequired,
};

export default FlashcardList;
