import PaymentSuccess from './PaymentSuccess';

const PaymentPage = () => {
    // const navigate = useNavigate();
    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         navigate('/'); // 👉 đổi path theo ý
    //     }, 3000);

    //     return () => clearTimeout(timeout); // cleanup nếu rời trang sớm
    // }, [navigate]);

    return <PaymentSuccess />;
};

export default PaymentPage;
