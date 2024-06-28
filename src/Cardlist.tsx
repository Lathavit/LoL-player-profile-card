import React from 'react';
import { CardData } from './types/types';
import Card from './Card'; // Import Card component
import AddCard from './AddCard';
import { Link } from 'react-router-dom';

interface CardListProps {
    cards: CardData[];
    onTagClick: (tag: string) => void; // Pass the tag value
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const CardList: React.FC<CardListProps> = ({ cards, onTagClick, onEdit, onDelete }) => {
    return (
        <div className="card-list-container">
            {cards.map(card => (
                <Card
                    key={card.id}
                    data={card}
                    onTagClick={() => onTagClick(card.tag)} // Pass the tag value when clicked
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
            <Link to="create">
                <AddCard />
            </Link>
        </div>
    );
};

export default CardList;
