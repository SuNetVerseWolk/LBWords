import { SVGMotionProps } from "framer-motion";

export default interface CustomSVGProps extends SVGMotionProps<SVGSVGElement> {
	hovered?: boolean;
	className?: string;
	pathProps?: React.SVGProps<SVGPathElement>;
	pathMotionProps?: SVGMotionProps<SVGPathElement>;
	polygonMotionProps?: SVGMotionProps<SVGPolygonElement>;
}