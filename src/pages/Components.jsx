import Avatar from "../components/Avatar";
import Badge from "../components/Badge";
import Button from "../components/Button";
import Card from "../components/Card";
import Container from "../components/Container";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import ProductCard from "../components/ProductCard";
import Table from "../components/Table";

export default function Components() {
    const headers = [
        "No",
        "Nama Produk",
        "Kategori",
        "Harga",
        "Aksi"
    ];

    const products = [
        {
            id: 1,
            name: "Laptop Asus",
            category: "Elektronik",
            price: "Rp 8.000.000"
        },
        {
            id: 2,
            name: "Sepatu Sport",
            category: "Fashion",
            price: "Rp 450.000"
        },
        {
            id: 3,
            name: "Jam Tangan",
            category: "Aksesoris",
            price: "Rp 799.000"
        }
    ];
    return (
        <>
            <Container id="dashboard-container">
                <PageHeader title="Components" breadcrumb1="Dashboard/Components" breadcrumb2="Add New Components" />

                <div className="flex gap-2 mt-4">
                    <Button type="primary">Edit</Button>
                    <Button type="secondary">Edit</Button>
                    <Button type="success">Simpan</Button>
                    <Button type="danger">Hapus</Button>
                    <Button type="warning">Warning</Button>
                </div>

                <div className="flex gap-2 mt-4">
                    <Badge type="primary">Edit</Badge>
                    <Badge type="secondary">Edit</Badge>
                    <Badge type="success">Simpan</Badge>
                    <Badge type="danger">Hapus</Badge>
                    <Badge type="warning">Warning</Badge>
                </div>
                <div className="flex gap-2 mt-4">
                    <Avatar name="Amelia Golisa">Amelia</Avatar>
                    <Avatar name="June">June</Avatar>
                    <Avatar name="Kai">Kail</Avatar>
                </div>
                <div className="flex gap-2 mt-4">
                    <Card>
                        <h2 className="text-xl font-bold">Judul Card</h2>
                        <p className="text-gray-600">Ini adalah isi dari card.</p>
                    </Card>
                </div>
                <div className="flex gap-2 mt-4">
                    <ProductCard
                        image="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                        title="Sepatu Sport"
                        category="Fashion"
                        price="Rp 450.000"
                        description="Sepatu sport modern dengan desain nyaman dan ringan untuk aktivitas sehari-hari."
                    />

                    <ProductCard
                        image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
                        title="Smartphone"
                        category="Elektronik"
                        price="Rp 4.500.000"
                        description="Smartphone dengan performa cepat, kamera jernih, dan baterai tahan lama."
                    />
                </div>
                <div className="flex gap-2 mt-4">
                    <Table headers={headers}>
                        {products.map((product, index) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                                <td className="border px-4 py-3">
                                    {index + 1}
                                </td>

                                <td className="border px-4 py-3">
                                    {product.name}
                                </td>

                                <td className="border px-4 py-3">
                                    {product.category}
                                </td>

                                <td className="border px-4 py-3">
                                    {product.price}
                                </td>

                                <td className="border px-4 py-3">
                                    <button className="bg-blue-600 text-white px-3 py-1 rounded">
                                        Detail
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </Table>
                </div>
            </Container>
            <Footer />
        </>
    );
}