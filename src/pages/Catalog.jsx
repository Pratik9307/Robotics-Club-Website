import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
import Course_Card from '../components/core/Catalog/Course_Card';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import { useSelector } from "react-redux";
import Error from "./Error";
import "./Catalog.css"; // Import your CSS file

const Catalog = () => {

    const { loading } = useSelector((state) => state.profile);
    const { catalogName } = useParams();
    const [active, setActive] = useState(1);
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");

    // Fetch all categories
    useEffect(() => {
        const getCategories = async () => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            const category_id = res?.data?.data?.filter(
                (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
            )[0]._id;
            setCategoryId(category_id);
        };
        getCategories();
    }, [catalogName]);

    // Fetch category details
    useEffect(() => {
        const getCategoryDetails = async () => {
            try {
                const res = await getCatalogaPageData(categoryId);
                console.log("PRinting res: ", res);
                setCatalogPageData(res);
            } catch (error) {
                console.log(error);
            }
        };
        if (categoryId) {
            getCategoryDetails();
        }
    }, [categoryId]);

    if (loading || !catalogPageData) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        );
    }

    if (!loading && !catalogPageData.success) {
        return <Error />;
    }

    return (
        <>
            {/* Hero Section */}
            <div className="catalog-container">
                <div className="hero-section">
                    <p>
                        {`Home / Catalog / `}
                        <span>{catalogPageData?.data?.selectedCategory?.name}</span>
                    </p>
                    <h1>{catalogPageData?.data?.selectedCategory?.name}</h1>
                    <p className="description">
                        {catalogPageData?.data?.selectedCategory?.description}
                    </p>
                </div>
            </div>

            {/* Section 1 */}
            <div className="catalog-container">
                <div className="section-heading">Courses to get you started</div>
                <div className="section-tabs">
                    <p
                        className={`tab-item ${active === 1 ? "active" : ""}`}
                        onClick={() => setActive(1)}
                    >
                        Most Popular
                    </p>
                    <p
                        className={`tab-item ${active === 2 ? "active" : ""}`}
                        onClick={() => setActive(2)}
                    >
                        New
                    </p>
                </div>
                <div className="course-slider">
                    <CourseSlider
                        Courses={catalogPageData?.data?.selectedCategory?.courses}
                    />
                </div>
            </div>

            {/* Section 2 */}
            <div className="catalog-container">
                <div className="section-heading">
                    Top courses in {catalogPageData?.data?.differentCategory?.name}
                </div>
                <div className="course-slider">
                    <CourseSlider
                        Courses={catalogPageData?.data?.differentCategory?.courses}
                    />
                </div>
            </div>

            {/* Section 3 */}
            <div className="catalog-container">
                <div className="section-heading">Frequently Bought</div>
                <div className="course-grid course-grid-1col">
                    {catalogPageData?.data?.mostSellingCourses
                        ?.slice(0, 4)
                        .map((course, i) => (
                            <Course_Card course={course} key={i} />
                        ))}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Catalog;
