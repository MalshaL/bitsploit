import React from "react";
import {Link} from "gatsby";


export const Pagination = ({currentPage, pageCount}) => (
    <nav className="pagination">
        {currentPage === 2 ? (
                <Link className="pageItem1"
                    title="Go to previous page"
                    to={`/`}>
                    ← Newer posts
                </Link>) :
        currentPage > 2 ? (
                <Link className="pageItem1"
                    title="Go to previous page"
                    to={`/${currentPage - 1}`}>
                    ← Newer posts
                </Link>) :
            <span />}
        <p className="pageItem2">Page {currentPage} of {pageCount}</p>
        {currentPage < pageCount ? (
                <Link className="pageItem3"
                    title="Go to next page"
                    to={`/${currentPage + 1}`}>
                    Older posts →
                </Link>) :
            <span />}
    </nav>
);