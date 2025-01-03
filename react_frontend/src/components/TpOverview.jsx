import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import * as d3 from "d3";

const TpOverview = ({data}) => {
    const svgRef = useRef();
    const containerRef = useRef();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const navigate = useNavigate();

    const handlePointClick = (name) => {
        navigate(`/tpview/${name}`);
    };

    useEffect(() => {

        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            const { width, height } = entry.contentRect;
            console.log(width)
            console.log(height)
            setDimensions({ width, height });
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []); 

    useEffect(() => {

        const { width, height } = dimensions;

        const svg = d3.select(svgRef.current);
        const margin = { top: 20, right: 20, bottom: 100, left: 80 };

        // Clear previous content
        svg.selectAll("*").remove();

        // Define scales
        const xScale = d3
            .scalePoint()
            .domain(data.map((d) => d.Tool))
            .range([margin.left, width - margin.right])
            .padding(.5);

        const yScale = d3
            .scaleLinear()
            .domain([2.5, 5]) // Fixed range
            .range([height - margin.bottom, margin.top]);

        // Create axes
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        // Append axes
        svg
            .append("g")
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(xAxis)
            .selectAll("text")
            .style("font-size", "12px")
            .attr("transform", "rotate(-45)")
            .style("text-anchor", "end");

        svg
            .append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(yAxis)
            .selectAll("text")
            .style("font-size", "12px");

        // Add scatter points
        svg 
            .selectAll("circle")
            .data(data)
            .join("circle")
            .attr("cx", (d) => xScale(d.Tool))
            .attr("cy", (d) => yScale(d.Rating))
            .attr("r", 6)
            .attr("fill", "steelblue")
            .on("click", (event, d) => {
                handlePointClick(d.Tool);
            });

        // Add horizontal line at 4 stars
        svg
            .append("line")
            .attr("x1", margin.left)
            .attr("x2", width - margin.right)
            .attr("y1", yScale(4))
            .attr("y2", yScale(4))
            .attr("stroke", "red")
            .attr("stroke-dasharray", "4");

        // Add labels
        svg
            .selectAll("text.label")
            .data(data)
            .join("text")
            .attr("class", "label")
            .attr("x", (d) => xScale(d.Tool))
            .attr("y", (d) => yScale(d.Rating) - 10)
            .attr("text-anchor", "middle")
            .text((d) => d.Rating.toFixed(1))
            .style("font-size", "10px")
            .attr("fill", "white");
        
    }, [dimensions, data]);

    return (
        <div ref={containerRef} style={{ width: "70%", height: "500px" }}>
            <svg ref={svgRef} width={dimensions.width} height={dimensions.height}></svg>
        </div>
    );
}

export default TpOverview;