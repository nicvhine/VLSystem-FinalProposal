"use client";

import { useState } from "react";
import Navbar from "./navbar";
import Dashboard from "./dashboard";

export default function Head(){
    return(
        <div className="min-h-screen bg-white">
            < Navbar/>
            < Dashboard/>
        </div>
    )
}