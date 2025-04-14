import { BrowserRouter as Router, Route, Routes } from "react-router";
import RecipeList from "./pages/RecipeList.tsx";
import RecipeInfo from "./pages/RecipeInfo.tsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<RecipeInfo />} />
      </Routes>
    </Router>
  );
}
