import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Container from "../components/Container";
import PageHeader from "../components/PageHeader";

export default function Fiturxyz() {
    return (
        <Container id="feature-xyz-container">
            <div className="mt-6">
                <PageHeader title="Fiture XYZ" breadcrumb1="ini adalah halaman fitur XYZ" breadcrumb2="Add New Feature" />
                <Button variant="outline">Batal</Button>
                <Button variant="secondary">Batal</Button>
                <Button variant="destructive">Batal</Button>
            </div>
            <div className="mt-6">
                <Card className="mt-4 w-[380px]">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Belajar shadcn/ui</CardTitle>
                            <Badge variant="secondary">Baru</Badge>
                        </div>
                        <CardDescription>
                            Contoh penggunaan komponen shadcn/ui di React
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Komponen ini dibuat di branch <strong>setup-shadcn</strong>
                            lalu di-merge ke main.
                        </p>
                    </CardContent>

                    <CardFooter className="flex gap-2">
                        <Button>Simpan</Button>
                        <Button variant="outline">Batal</Button>
                    </CardFooter>
                </Card>
            </div>
        </Container>
    );
}