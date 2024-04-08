'use client'
import React, { useState, useEffect } from "react";
import Tabs from "../components/Tabs";
import AddBlog from "../components/AddBlog";
import AddCategory from "../components/AddCategory";
import { useSearchParams } from "next/navigation";

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.API_URL}/categories`, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await res.json();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []); // Run only once on component mount

  const index = parseInt(searchParams.get('index')) || 1;
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <Tabs index={index} />
        <div className="w-full md:w-3/4 bg-slate-100">
          {index === 1 && <AddBlog categories={categories} />}
          {index === 2 && <AddCategory />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
