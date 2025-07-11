import { Component } from 'react';
import { ProgressBar } from "../ProgressBar/ProgressBar";
import styles from "./BookCover.module.css";
import { BookModel } from '../../pages/public/Reading/BookModel';

interface BookCoverProps {
    image: string;
    title: string;
    backImage: string;
    backText?: string;
    bookId: string;
}

interface BookCoverState {
    progress: number;
}

export class BookCover extends Component<BookCoverProps, BookCoverState> {
    private model: BookModel;

    constructor(props: BookCoverProps) {
        super(props);
        this.model = new BookModel(props.bookId);
        this.state = {
            progress: 0,
        };
    }

    componentDidMount() {
        this.model.loadProgress().then(() => {
            const bookState = this.model.getState();
            const progressPercentage = Math.round((bookState.progress / bookState.pages) * 100);
            this.setState({ progress: progressPercentage });
        });
    }

    render() {
        const { image, title, backImage, backText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." } = this.props;
        const { progress } = this.state;

        return (
            <div className={styles["container-book"]}>
                <h1 id="title" className={styles.title}>{title}</h1>
                
                <div className={styles["flip-card"]}>
                    <div className={styles["book-front"]}>
                        <img src={image} alt="front cover" />
                    </div>
                    <div className={styles["book-back"]}>
                        <img src={backImage} alt="back cover" />
                        <div className={styles["back-content"]}>
                            <p className={styles["back-text"]}>{backText}</p>
                        </div>
                    </div>
                </div>
                <div className={styles["container-progress"]}>
                    <ProgressBar imgSrc="/assets/img/achievements/bronze/achievement-reader-bronze.png" progress={progress}></ProgressBar>
                </div>
            </div>
        );
    }
}

export default BookCover;