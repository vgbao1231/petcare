
export function adaptAppointmentPayload({ formData, selectedServices, selectedProducts, token, servingType }) {
    const customer_id = parseInt(token?.user_id);

    const scheduleTime = formData.date
        .hour(formData.time.hour())
        .minute(formData.time.minute())
        .tz('Asia/Bangkok', true)
        .format('YYYY-MM-DDTHH:mm:ssZ');

    const serviceData = selectedServices.map((s) => ({
        service_id: s.serviceId,
        quantity: s.quantity,
    }));

    const productData = selectedProducts.map((p) => ({
        product_id: p.product_id,
        product_name: p.name,
        product_type: p.product_type,
        quantity: p.quantity,
        unit_price: p.price,
    }));

    const baseAddress =
        servingType === 0
            ? { customer_address: formData.address }
            : { branch_id: formData.branch };

    const appointmentPayload = {
        customer_id,
        ...baseAddress,
        scheduled_time: scheduleTime,
        note: formData.note,
        services: serviceData,
    };

    const orderPayload = {
        customer_id,
        ...baseAddress,
        items: productData,
    };

    return {
        appointmentPayload,
        orderPayload,
        hasService: serviceData.length > 0,
        hasProduct: productData.length > 0,
    };
}
