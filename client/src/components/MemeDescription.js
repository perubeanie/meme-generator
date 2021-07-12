/* importing images */

/* bootstrap imports */
import { Row, Col, Button } from 'react-bootstrap';

/* react imports */
import { useLocation } from "react-router-dom";
import { useState } from "react";

/* importing icons */
import { BsTrash } from 'react-icons/bs';
import { RiImageEditFill } from 'react-icons/ri';

/* imports from my files */
import { DeleteModal } from './MemeForms';
import { AddCopyMeme } from './MemeForms';

function MemeDescription(props) {

    const [showDelete, setShowDelete] = useState(false);
    const [showCopy, setShowCopy] = useState(false);

    const handleCloseDelete = () => {
        setShowDelete(false);
    }

    const handleShowDelete = () => {
        setShowDelete(true);
    }

    const handleCloseCopy = () => {
        setShowCopy(false);
    }

    const handleShowCopy = () => {
        setShowCopy(true);
    }

    const location = useLocation();
    const meme = location.state ? location.state.meme : '';

    console.log(props.images + 'from meme property');

    return (
        <Row className="vh-auto">
            <Col xs={7}>
                <div className="container">
                    <img src={props.images[meme.image].title} alt={meme.title} className='img-fluid' />
                    <div className={`${props.images[meme.image].position1} ${meme.color} ${meme.font}`}>{meme.sentence1}</div>
                    <div className={`${props.images[meme.image].position2} ${meme.color} ${meme.font}`}>{meme.sentence2}</div>
                    <div className={`${props.images[meme.image].position3} ${meme.color} ${meme.font}`}>{meme.sentence3}</div>
                </div>
            </Col>
            <Col className={"my-auto"} xs={5}>
                <div id="title">{`Title: ${meme.title}`}</div>
                <div id="author">{`By: ${meme.creator}`}</div>
                <div id="edit_buttons">
                    <Button variant="info" size="lg" disabled={props.loggedIn ? false : true} onClick={handleShowCopy}>Copy<RiImageEditFill /></Button>{' '}
                    <AddCopyMeme meme={meme} show={showCopy} handleClose={handleCloseCopy} copyMode={1} createMeme={props.createMeme} images={props.images} user={props.user}/>
                    <Button variant="info" size="lg" onClick={handleShowDelete} disabled={props.loggedIn && props.user !== undefined && meme.creator === props.user.name ? false : true}>Delete<BsTrash /></Button>
                    <DeleteModal show={showDelete} handleClose={handleCloseDelete} deleteMeme={props.deleteMeme} meme={meme}/>
                </div>
                <div id="visibility">{`This meme is ${meme.visibility} and ${meme.copy ? 'a copy' : 'made from scratch'}.`}</div>
            </Col>
        </Row>
    );
}

export { MemeDescription };