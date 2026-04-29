export const exportCss = `
@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes slideInLeft {
	from {
		opacity: 0;
		transform: translateX(-20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes slideInRight {
	from {
		opacity: 0;
		transform: translateX(20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.animate-fade-in {
	animation: fadeIn 0.8s ease-out forwards;
}

.animate-slide-in-right {
	animation: slideInRight 0.8s ease-out forwards;
}
.animate-slide-in-left {
	animation: slideInLeft 0.8s ease-out forwards;
}

.hero-preset-flex {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1rem;
}

.product-block {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
	gap: 24px;
	padding: 48px 24px;
	box-sizing: border-box;
	min-height: 50vh;
}

.product-card {
	border-radius: 16px;
	padding: 24px;
	box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
	transition:
		transform 0.2s ease,
		box-shadow 0.2s ease;
	display: flex;
	flex-direction: column;
	gap: 12px;
}

.product-card--featured {
	transform: scale(1.03);
}

.product-card--ghost {
	background: linear-gradient(
		to bottom right,
		rgba(255, 255, 255, 0.08),
		rgba(255, 255, 255, 0.03)
	) !important;

	border: 1px solid rgba(255, 255, 255, 0.08);
}
.product-card--outlined {
	border: 1px solid;
}

.product-card--glass {
	background: rgba(255, 255, 255, 0.4) !important;
	backdrop-filter: blur(20px);
	border: 1px solid rgba(255, 255, 255, 0.1);
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
	border-radius: 24px;
}
.product-card:hover {
	transform: translateY(-4px);
	box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
}
.product-card-heading {
	text-align: center;
	font-size: 1.25rem;
	font-weight: 600;
	margin: 0;
}

.product-card-subheading {
	text-align: center;
	font-size: 0.95rem;
	margin-bottom: 12px;
	line-height: 1.5;
}

.product-card-additional {
	/* margin-top: 8px; */
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.product-card-additional:last-child hr {
	display: none;
}

.separator {
	border: none;
	height: 1px;
	background-color: #e5e7eb;
	/* margin: 8px 0 4px; */
}

@media (max-width: 768px) {
	.hero-preset-flex {
		flex-direction: column;
	}
}

`;
