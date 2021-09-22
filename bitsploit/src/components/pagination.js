import React from "react";
import {Link} from "gatsby";


export const Pagination = ({currentPage, pageCount}) => (
    <nav className="pagination">
        {currentPage === 2 ? (
                <Link
                    title="Go to previous page"
                    to={`/`}>
                    ← Newer posts
                </Link>) :
        currentPage > 2 ? (
                <Link
                    title="Go to previous page"
                    to={`/${currentPage - 1}`}>
                    ← Newer posts
                </Link>) :
            <span />}
        Page {currentPage} of {pageCount}
        {currentPage < pageCount ? (
                <Link
                    title="Go to next page"
                    to={`/${currentPage + 1}`}>
                    Older posts →
                </Link>) :
            <span />}
    </nav>
);