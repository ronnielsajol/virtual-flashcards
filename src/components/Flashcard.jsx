import { useState } from "react";
import PropTypes from "prop-types";

const Flashcard = ({ question, answer }) => {
	const [flipped, setFlipped] = useState(false);

	return (
		<div className='w-full max-w-xs p-4 mx-auto my-4 bg-white rounded-lg shadow-md' onClick={() => setFlipped(!flipped)}>
			<div className={`transform transition-transform ${flipped ? "rotate-y-180" : ""}`}>
				<p className='text-lg font-semibold'>{flipped ? answer : question}</p>
			</div>
		</div>
	);
};

Flashcard.propTypes = {
	question: PropTypes.string.isRequired,
	answer: PropTypes.string.isRequired,
};

export default Flashcard;
