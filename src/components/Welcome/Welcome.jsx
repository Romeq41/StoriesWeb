import React, { useEffect } from "react";
import './Welcome.css';

export default function Welcome() {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                } else {
                    entry.target.classList.remove('show');
                }
            });
        });

        const hiddenElements = document.querySelectorAll('.hidden');
        hiddenElements.forEach((el) => observer.observe(el));

        return () => {
            hiddenElements.forEach((el) => observer.unobserve(el));
        };

    }, []);

    return (
        <div className="Welcome">
            <h1 className="hidden">Share your story.</h1>
            <h1 className="hidden">Anonymously.</h1>
            <h1 className="hidden">Safely.</h1>
            <h1 className="hidden">On StoryTime.</h1>
            <br />
            <a href="#StoriesHeader">
                <button id="discoverButton">
                    Discover Stories
                    <img src="https://firebasestorage.googleapis.com/v0/b/storiesapp-eca88.appspot.com/o/bonfire.png?alt=media&token=78f5afea-d832-49c4-810e-650ecf2b8d90" alt="Bonfire Icon" style={{ height: "20px",width:"20px",margin: "0 0 0 10px"}} />
                </button>
            </a>
        </div>
    );
}
