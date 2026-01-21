import { NextRequest, NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';
import { getLessonById } from '@/lib/data/nacionalidad-lessons';

export async function GET(req: NextRequest, context: any) {
  try {
    const id = context?.params?.id;
    const lesson = getLessonById(id);
    if (!lesson) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const doc = new PDFDocument({ margin: 50 });
    const chunks: Uint8Array[] = [];
    doc.on('data', (chunk: any) => chunks.push(chunk));
    const title = `${lesson.title}`;
    doc.fontSize(20).text(title, { align: 'center' }).moveDown(1);
    doc.fontSize(12).text(lesson.content.replace(/\\n/g, '\n'), { align: 'left' });
    doc.end();

    // Wait for end
    await new Promise((resolve) => doc.on('end', resolve));
    const pdf = Buffer.concat(chunks);
    return new NextResponse(pdf, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${lesson.id}.pdf"`,
      },
    });
  } catch (e: any) {
    console.error('pdf generate error', e);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}

