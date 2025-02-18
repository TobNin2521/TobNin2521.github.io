import './SpellCard.css'

export const SpellCard = ({spell}) => {
    console.log(spell);

    return (
        <div className="spell-container">
            <div className="spell-card">
                <div className="spell-title">Fireball</div>
                <div className="spell-info"><strong>Level:</strong> 3</div>
                <div className="spell-info"><strong>School:</strong> Evocation</div>
                <div className="spell-info"><strong>Casting Time:</strong> 1 action</div>
                <div className="spell-info"><strong>Range:</strong> 150 feet</div>
                <div className="spell-info"><strong>Components:</strong> V, S, M (a tiny ball of bat guano and sulfur)</div>
                <div className="spell-info"><strong>Duration:</strong> Instantaneous</div>
                <div className="spell-description">
                    A bright streak flashes from your pointing finger to a point you choose within range and then blossoms with a low roar into an explosion of flame. Each creature in a 20-foot radius sphere must make a Dexterity saving throw, taking 8d6 fire damage on a failed save, or half as much on a successful one.
                </div>
            </div>
        </div>
    );
};